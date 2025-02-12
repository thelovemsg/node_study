console.log("hello Node.js");

const a = [1, 2, 3];
console.log(a);

//배열의 길이를 표준 출력에 표시한다. Array.prototype
Array.prototype.showLength = function () {
  console.log(this.length);
};

a.showLength();
