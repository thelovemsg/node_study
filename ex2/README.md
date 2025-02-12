1. class와 같이 상태를 내포하는 설계는 피하는 편이 좋다.

2. 싱글 스레드/싱글 프로세스라는 Ndoe.js 특성상 '객체의 상태에 따라 동작이 변한다 = 함수가 인수 이외의 사이드 이펙트를 갖는다'
=> class 보다 함수를 조합해서 기능을 구현하는 것이 더 나을 수도


3. 실행되는 context에 따라서 this의 값이 달라진다.

4. arrow function roles in fixingc context when it's executed.
you should use arrow function until you get used to it.


