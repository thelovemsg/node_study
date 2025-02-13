import { readFile, writeFile, chmod } from "fs";

const readFileAsync = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

const writeFileAsync = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

const chmodAsync = (path, mode) => {
  return new Promise((resolve, reject) => {
    chmod(backupFile, mode, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const backupFile = `${__filename}-${Date.now()}`;

readFileAsync(__filename)
  .then((data) => {
    return writeFileAsync(backupFile, data);
  })
  .then(() => {
    return chmodAsync(backupFile, 0o400);
  })
  .catch((err) => {
    console.log(err);
  });

//해당 코드들은 일부러 연습을 위해서 장황한 것이고, Node.js 에서 fs같은 표준 모듈에는 처음부터 프로미스 인터페이스가 구현돼 있다.
