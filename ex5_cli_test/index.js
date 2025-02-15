import { fileURLToPath } from "url";
import path from "path";
import { marked } from "marked";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { readMarkdownFileSync, writeHtmlFileSync } from "./lib/file.js";
import { getPackageName } from "./lib/name.js";

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
  })
  .option("out", {
    describe: "html file",
    default: "article.html",
  });

//name 옵션의 동작을 이동
if (argv.name) {
  const name = getPackageName();
  console.log(name);
  process.exit(0);
}

//path.resolve => 절대경로를 생성
// const markdownStr = readMarkdownFileSync(path.resolve(__dirname, argv.file), {
//   encoding: "utf-8",
// });

const markdownStr = readMarkdownFileSync(path.resolve(__dirname, argv.file));
const html = marked(markdownStr);

writeHtmlFileSync(path.resolve(__dirname, argv.out), html);

console.log(markdownStr);
