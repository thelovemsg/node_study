//1. class 직접 생성 및 사용
class People {
  constructor(name) {
    this.name = name;
  }
  printName() {
    console.log(this.name);
  }
}

const foo = new People("foo-name");
foo.printName(); // foo-name

function People(name) {
  this.name = name;
}

// 함수의 프로토타입을 이용한 선언 및 사용
People.prototype.printName = function () {
  console.log(this.name);
};

const foo1 = new People("foo-name");
foo1.printName();
