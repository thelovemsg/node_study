import fs from "fs";
import { writeFile } from "fs/promises";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const readStream = fs.createReadStream(__filename, {
  encoding: "utf8",
  highWaterMark: 64,
});

const writeFilename = `${__filename}-${Date.now()}`;

const write = async (chunk) => {
  await sleep(Math.random() * 1000);
  await writeFile(writeFilename, chunk, { flag: "a" });
};

const main = async () => {
  const stream = fs.createReadStream(__filename, {
    encoding: "utf8",
    highWaterMark: 64,
  });
};

let counter = 0;
readStream.on("data", async (chunk) => {
  for await (const chunk of stream) {
    console.log(counter);
    counter++;
  }

  await write(chunk);
});

main().catch((e) => console.log(e));

/**
 * AyncIteraotr를 사용하면...?
 * 비동기 처리를 구현한 객체를 마치 배열과 같이 반복 처리할 수 있게 도와준다.
 *
 * 병렬로 처리하던 것을 직렬로 처리하면 성능상 문제가 될 수 있으니 적절히 이용해야 한다.
 */

