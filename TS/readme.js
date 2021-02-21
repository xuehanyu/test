//1、什么是泛型（Generics）泛指的类型，到底是哪个具体的类型，我们不知道
// 泛型是指在定义函数、接口、类、类型别名的时候，不预先指定具体的类型，而在使用的时候在指定类型的一种特性
//首先，我们定义一个函数，它接口一个string类型的参数，返回一个stirng类型
function copy(data) {
    return data;
}
function join(first, second) {
    return "" + first + second;
}
join('0', '0');
// 但是，如果我们想接收一个number类型的参数，并且返回一个number类型的参数呢？可以再写一遍，如果在来10种，就需要
// 定义10种，显然代码很冗余，想到any
function copy1(data) {
    return data;
}
// any虽然行的通，但是和普通js写法没什么区别，丢失了所有类型的概念，传入的类型与返回的类型应该是相同的。
// 如果我们传入一个数字，我们只知道任何类型的值都有可能被返回。
// 因此我们需要一种方法使返回值与传入参数的类型相同，这里，我们是用了类型变量， 它是一种特殊的变量，只是表示类型，
// 而不表示值 这里就用到了泛型，
function copy2(data) {
    return data;
}
// 2种使用方法 传入所有参数，包括类型参数
var r = copy2('111');
// 利用类型推论- 编译器会根据我们传入的参数自动的帮助我们确定T的类型
// let r = copy2('111')
// 1.2 多类型参数，定义多个泛型
function join1(first, second) {
    return "" + first + second;
}
join1('1', 2);
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
var re = swap([1, '2']);
// 1.3 作为类型的一部分
function map0(params) {
    // console.log(params.length); 报错
    return params;
}
function map(params) {
    return params;
}
map(['222']);
function a() {
    return;
}
var DataManage = /** @class */ (function () {
    // 类里面声明了泛型T 不知道什么类型  继承了Item 意思是未来对应具体的类型，具体的类型一定要有item中的所有的东西
    function DataManage(data) {
        this.data = data;
    }
    DataManage.prototype.getItem = function (index) {
        return this.data[index];
    };
    return DataManage;
}());
var data = new DataManage([]); //
// 泛型类型  泛型还可以作为type的声明，用泛型声明一些类型
//() => string  对funciton 类型的一个注解
var func = function () {
    return '111  ';
};
// 如何使用泛型作为一个具体的类型注解
// 函数接收一个泛型， 用泛型的概念，对函数的类型做了一个约束, 实现对函数的类型做一个匹配
function hello(params) {
    return params;
}
var func1 = function () {
    return '111  ';
};
var func2 = hello;
