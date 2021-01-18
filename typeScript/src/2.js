"use strict";
exports.__esModule = true;
function identity(arg) {
    return arg;
}
var r = identity(1);
function identify1(arg) {
    console.log(arg, typeof arg)
    return arg.length;
}
var r1 = identify1(1);
console.log(r1);
