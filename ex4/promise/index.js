// resolve : 성공 | reject : 실패

const promiseA = new Promise((resolve, reject) => {
  resolve("return data");
});

promiseA.then((data) => console.log(data));

const promiseB = new Promise((resolve, reject) => {
  reject(new Error("return error"));
});

promiseB.catch((err) => console.log(err));

console.log("done");
