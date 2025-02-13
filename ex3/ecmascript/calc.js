"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sub = exports.add = exports.num = void 0;
exports.default = default_1;
exports.num = 1;
const add = (a, b) => {
    return a + b;
};
exports.add = add;
const sub = (a, b) => {
    return a - b;
};
exports.sub = sub;
function default_1(a) {
    console.log(`input a : ${a}`);
    return "test";
}
