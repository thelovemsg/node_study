//Node.js의 이벤트 기반 시스템을 사용해서 특정 이벤트가 발생할 때 콜백 함수를 실행하는 패턴
//Emitter 를 더 쉽게 다루도록 도와주는것이 Stream 인터페이스이다
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const MyEmitter = new MyEmitter();

MyEmitter.on("myevent", (data) => {
  console.log("on myevent: ", data);
});

MyEmitter.emit("myevent", "one");

setTimeout(() => {
  MyEmitter.emit("myevent", "two");
}, 1000);
