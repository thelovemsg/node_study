import { readMarkdownFileSync } from "./file.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("readMarkdownFileSync", () => {
  //   readMarkdownFileSync("test.md");
  const markdown = readMarkdownFileSync(
    path.resolve(__dirname, "../fixture/test.md")
  );
  console.log(markdown);
  expect(markdown.trim()).toStrictEqual("**bold**");
});
