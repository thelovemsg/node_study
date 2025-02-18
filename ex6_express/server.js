const redis = require("./lib/redis");
const express = require("express");
const path = require("path");
const app = express();
const api = require("./routes/api");
const usersHandler = require("./handlers/users");

const wrapAPI = (fn) => {
  return (req, res, next) => {
    try {
      fn(req)
        .then((data) => res.status(200).json(data))
        .catch((e) => next(e));
    } catch (error) {
      next(e);
    }
  };
};

const handler = async (req) => {
  const error = new Error("무언가의 에러");
  error.stauts = 400;

  throw error;
};

app.set("view engine", "ejs");

const errorMiddleware = (req, res, next) => {
  next(new Error("미들웨어에서 에러"));
};

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views", "index.ejs"));
  // res.status(200).send("hello world\n");
});

// app.get("/user/:id", async (req, res) => {
//   try {
//     const user = await usersHandler.getUser(req);
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("internal error");
//   }
// });
app.get("/user/:id", wrapAPI(handler));

app.get("/users", async (req, res) => {
  try {
    const locals = await usersHandler.getUsers(req);
    res.render(path.join(__dirname, "views", "user.ejs"), locals);
  } catch (error) {
    console.error(error);
    // res.status(500).send("internal error");
  }
});

redis
  .connect()
  .once("ready", async () => {
    try {
      await redis.init();

      app.listen(3000, () => {
        console.log("start listening");
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

app.get("/err", errorMiddleware, (req, res) => {
  console.log("err 라우트");
  res.status(200).send("err 라우트");
});

// 포괄적인 에러 핸들링
// 비동기는 잡아낼 수 없으니 주의
app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send(err.message);
  }
  res.status(500).send("Internal Server Error");
  console.log("[Internal Server Error]", err);
});

app.use("/api", api.router);

app.use("/static", express.static(path.join(__dirname, "public")));
