const mockRedisGet = jest.fn(); //get의 목
const mockRedisScanStream = jest.fn(); //scanStream의 목

jest.mock("../lib/redis", () => {
  return {
    getClient: jest.fn().mockImplementation(() => {
      return {
        get: mockRedisGet,
        scanStream: mockRedisScanStream,
      };
    }),
  };
});

const { getUser, getUsers } = require("./users");

beforeEach(() => {
  mockRedisGet.mockClear();
  mockRedisScanStream.mockClear();
});

test("getUser", async () => {
  mockRedisGet.mockResolvedValue(JSON.stringify({ id: 1, name: "alpha" }));
  const reqMock = { params: { id: 1 } };

  const resMock = {
    status: jest.fn().mockReturnTthis(),
    json: jest.fn().mockReturnTthis(),
  };

  await getUser(reqMock, resMock);

  expect(resMock.status).toHaveBeenCalledTimes(1);
  expect(resMock.status).toHaveBeenCalledWith(200);

  //redis.get의 호출 횟수 테스트(여기는 이전까지와 같음)
  expect(mockRedisGet).toHaveBeenCalledTimes(1);
  expect(mockRedisGet.mock.calls.length).toStrictEqual(1);

  // toHaveBeenCalledWith 로 바꿔 써도 OK!
  const [arg1] = mockRedisGet.mock.calls[0];
  expect(arg1).toStrictEqual("users:1");
});

test("getUsers", async () => {
  const streamMock = {
    async *[Symbol.asyncIterator]() {
      yield ["users:1", "users:2"];
      yield ["users:3", "users:4"];
    },
  };

  mockRedisScanStream.mockReturnValueOnce(streamMock);
  mockRedisGet.mockImplementation((key) => {
    switch (key) {
      case "users:1":
        return Promise.resolve(JSON.stringify({ id: 1, name: "alpha" }));
      case "users:2":
        return Promise.resolve(JSON.stringify({ id: 2, name: "bravo" }));
      case "users:3":
        return Promise.resolve(JSON.stringify({ id: 3, name: "charlie" }));
      case "users:4":
        return Promise.resolve(JSON.stringify({ id: 4, name: "delta" }));
    }
    return Promise.resolve(null);
  });

  const reqMock = {};

  const res = await getUsers(reqMock);

  expect(mockRedisScanStream).toHaveBeenCalledTimes(1);
  expect(mockRedisGet).toHaveBeenCalledTimes(4);
  expect(res.users.length).toStrictEqual(4);
  expect(res.users).toStrictEqual([
    { id: 1, name: "alpha" },
    { id: 2, name: "bravo" },
    { id: 3, name: "charlie" },
    { id: 4, name: "delta" },
  ]);
});

test("getUser 실패", async () => {
  expect.assertions(2);

  //error 를 반환하는게 아는 null 이나 undefined를 반환할 때 catch를 타지 않음
  mockRedisGet.mockResolvedValue(new Error("something error"));

  const reqMock = { params: { id: 1 } };

  try {
    await getUser(reqMock);
  } catch (error) {
    expect(error.message).toStrictEqual("something erorr");
    expect(err instanceof Error).toStrictEqual(true);
  }
});
