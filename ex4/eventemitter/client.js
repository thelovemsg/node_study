import http from "http";

const req = http.request("http://localhost:3000", (res) => {
  res.setEncoding("utf-8");

  res.on("data", (chunk) => {
    console.log(`body: ${chunk}`);
  });

  res.on("end", () => {
    console.log("end");
  });
});

req.end();

/**
 * HTTP 요청 흐름을 간단하게 정리
 * 1. 서버에 연결한다.
 * 2. 데이터를 서버에서 가져온다.
 * 3. 서버에 대한 연결을 끊는다.
 */
