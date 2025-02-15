import path from "path";
import fs from "fs";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//hideBin => process.argv.slice(2) 의 줄임말
// node index.js --help 시 도움말 생성됨
const { argv } = yargs(hideBin(process.argv))
  .option("name", {
    describe: "CLI 이름을 표시",
  })
  .option("file", {
    describe: "마크다운 파일 경로",
  });

//package.json을 받는것 이외로는 다른 일을 안하니 그냥 동기적으로 처리
const packageStr = fs.readFileSync(path.resolve(__dirname, "package.json"), {
  encoding: "utf-8",
});

const packageContent = JSON.parse(packageStr);

// const nameOption = process.argv.includes("--name");

// console.log(packageContent);

/*
if (nameOption) {
  console.log(packageContent.name);
} else {
  console.log("옵션이 없습니다.");
}
*/
if (argv.file) {
  console.log(argv.file);
} else if (argv.name) {
  console.log(packageContent.name);
} else {
  console.log("옵션이 없습니다.");
}
