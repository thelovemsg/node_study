import { createServer } from "http";

//createServer 로  생성된 서버 인스턴스는 Stream 객체

const server = createServer();

server.on("request", (req, res) => {
  setTimeout(() => {
    res.end("hello");
  }, 100);
});

server.listen(8000);
