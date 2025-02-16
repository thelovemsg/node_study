const Redis = require("ioredis");
const express = require("express");
const path = require("path");
const app = express();
const { logMiddleware } = require("./middleware/logger");

app.set("view engine", "ejs");

const redis = new Redis({
  port: 6379,
  host: "localhost",
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
});

const init = async () => {
  await Promise.all([
    redis.set("users:1", JSON.stringify({ id: 1, name: "alpha" })),
    redis.set("users:2", JSON.stringify({ id: 2, name: "bravo" })),
    redis.set("users:3", JSON.stringify({ id: 3, name: "charlie" })),
    redis.set("users:4", JSON.stringify({ id: 4, name: "delta" })),
  ]);
};

const errorMiddleware = (req, res, next) => {
  next(new Error("미들웨어에서 에러"));
};

// redis는 EventEmitter를 상속하기 떄문에 다양한 이벤트 핸들링을 할 수 있다.
redis.once("ready", async () => {
  try {
    await init();
    app.listen(4041, () => {
      console.log("start listening");
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});

app.get("/", (req, res) => {
  console.log("here!@");
  res.render(path.join(__dirname, "views", "index.ejs"));
  // res.status(200).send("hello world\n");
});

app.get("/user/:id", async (req, res) => {
  try {
    const key = `user:${req.params.id}`;
    const val = await redis.get(key);
    const user = JSON.parse(val);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("internal error");
  }
});

app.get("/users", async (req, res) => {
  try {
    const stream = redis.scanStream({
      match: "users:*",
      count: 2, // 1번 호출에서 2개를 꺼낸다.
    });

    const users = [];
    for await (const resultKeys of stream) {
      for (const key of resultKeys) {
        const value = await redis.get(key);
        const user = JSON.parse(value);
        users.push(user);
      }
    }

    res.render(path.join(__dirname, "views", "user.ejs"), { users: users });
  } catch (error) {
    console.error(error);
    // res.status(500).send("internal error");
  }
});

redis.on("error", (err) => {
  console.log(err);
  process.exit(1);
});

app.get("/err", errorMiddleware, (req, res) => {
  console.log("err 라우트");
  res.status(200).send("err 라우트");
});

// 포괄적인 에러 핸들링
// 비동기는 잡아낼 수 없으니 주의
app.use((err, req, res, next) => {
  console.error("🔥 Internal Server Error:", err.stack);
  res.status(500).send("Internal Server Errors");
});

app.use(logMiddleware);
