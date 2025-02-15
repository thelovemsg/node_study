const { readFile, writeFile, chmod } = require("fs/promises");

const main = async () => {
  const backupFile = `${__filename}-${Date.now()}`;

  const data = await readFile(__filename);

  await writeFile(backupFile, data);

  await chmod(backupFile, 0o400);

  return "done";
};

main()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//Promise.all 을 사용해서 동시 실행을 할 수가 있다.
//엄연히 말해서 동시 실행이지, 병렬 실행이 아니다. Node.js 는 기본적으로 싱글스레드이기 때문이다.
