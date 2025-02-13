ECMAScript 모듈
자바스크립트의 표준 모듈 방식.
Node.js 에서 예전부터 표준으로 사용한 CommonJS모듈과 태생이 다르다.

ECMAScript 모듈
=> ~.mjs 사용도 가능한데, ts도 사용할 겸 그냥 ts로 쓴다.

=> 그런데 ts를 단일 파일로는 바로 실행할 수 없고 이걸 js 파일로 변환한 후 실행이 가능하다.

tsconfig.json 을 추가하고 package.json에 파일도 type을 추가

npm install 을 다시 하면 변경된 환경들을 다시 확인하고 올바르게 로드할 수 있도록 해준다.

