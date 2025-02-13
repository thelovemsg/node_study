import { readFile, writeFile, chmod } from "fs";

const backupFile = `${__filename}-${Data.now()}`;

// 콜백 지옥 발생! 콜백 안에 콜백을 계속 호출하면 안좋다.

readFile(__filename, (err, data) => {
  if (err) {
    return console.log(err);
  }
  writeFile(backupFile, data, (err) => {
    if (err) {
      return console.error(err);
    }
    chmod(backupFile, 0o400, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("done");
    });
  });
});
