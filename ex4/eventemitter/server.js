import http from "http";

const server = http.createServer();

// http
//   .createServer((req, res) => {
//     res.write("hello world\n");
//     res.end();
//   })
//   .listen(3000);

// 이렇게 하면 요청이 오지 안는 동안에는 다른 요청을 받거나 다른 처리를 수행할 수 있다.
server.on("request", (req, res) => {
  res.write("hello world\n");
  res.end();
});

server.listen(3000);
