import fs from "fs";

// npm install marked 사용

export const readMarkdownFileSync = (path) => {
  const markdownsStr = fs.readFileSync(path, { encoding: "utf-8" });
  return markdownsStr;
};

//지정한 경로에 HTML을 쓴다.
export const writeHtmlFileSync = (path, html) => {
  fs.writeFileSync(path, html, { encoding: "utf-8" });
};
