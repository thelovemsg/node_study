import { readFile } from "fs";

console.log("A");

readFile(__filename, (err, data) => {
  console.log("B", data);
});

console.log("C");

//실행 순서는 A -> C -> B

