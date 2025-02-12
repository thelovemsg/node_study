const { readFile } = require("fs");

console.log("A");

readFile(__filename, (err, data) => {
  console.log("B");
});

console.log("C");

/**
 * 실행 순서는
 * A
 * C
 * B
 * 이다
 *
 * Node.js 에서는 I/O 등의 이벤트가 발생하면 일단 내부에 잇는 대기 큐와 같은 것에 작업을 집어넣는다.
 *
 */
