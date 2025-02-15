import { readFile } from "fs/promises";

//async 함수가 아닌 위치에서도 await 할 수 있다.
const data = await readFile(new URL(import.meta.url), { encoding: "utf-8" });

console.log(data);
