import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageStr = fs.readFileSync(path.resolve(__dirname, "../package.json"), {
  encoding: "utf-8",
});

const packageContent = JSON.parse(packageStr);

export const getPackageName = () => {
  return packageContent.name;
};
