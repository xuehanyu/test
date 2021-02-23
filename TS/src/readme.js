"use strict";
exports.__esModule = true;
// 1、为什么要使用泛型
// 1.1 支持多种类型的方法
function id(arg) {
    return arg;
}
// 联合类型 代码冗余，重复编写
function id1(arg) {
    return arg;
}
// any类型 丢失类型检测，传入类型与返回类型应该相同
function id2(arg) {
    return arg;
}
var r = id2('string');
r.length; // ok
r.toFiexd(); // 也是OK
function id3(arg) {
    return arg;
}
var r2 = id3(2);
var r3 = id3('o');
// 2、泛型相关用法
// 2.1 泛型概念
// 泛指的类型，不预先指定具体的类型，在使用时才确定。在标志符后面使用<T> T自定义 U、K、P等等都经常会用到。
// 2.2 使用多个泛型
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap(['1', 4]);
var a = ['3'];
// let aa: A = [2] // Type 'number' is not assignable to type 'string'.
var aaa = [2];
// 3、泛型函数  
// 3.1 定义
function id5(arg) {
    return arg;
}
var r6 = id5('0');
var r7 = id5(9);
var id6 = function (arg) {
    return arg;
};
var id7 = function (arg) {
    return arg;
};
id7(9);
// 5、泛型类
var MyArray = /** @class */ (function () {
    function MyArray() {
        this.arr = [];
    }
    MyArray.prototype.add = function (v) {
        this.arr.push(v);
    };
    return MyArray;
}());
var arr = new MyArray();
arr.add('999');
function id9(arg) {
    console.log(arg.length); // Property 'length' does not exist on type 'T'.
    return arg;
}
// id9(222)
id9('09876');
id9([]);
id9({ length: 9 });
function getVal(obj, key) {
    return obj[key];
}
getVal({ a: '2', b: '3' }, 'a');
// 7、泛型的应用
