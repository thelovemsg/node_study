const { promisify } = require("util");
const { readFile, writeFile, chmod } = require("fs");
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const chmodAsync = promisify(chmod);
