"use strict";
exports.__esModule = true;
// npm install ts-node -g  通过全局安装ts的node环境可以通过run code跑代码
// 构建工具 webpack rollup 实时看出编译的结果以及映射的文件
// ts中拥有的类型 
// 1、基础类型
var str = '111';
var num = 1;
var boo = true;
// 元祖，表示长度和个数都限制好了
// 可以像元祖中添加内容，不能通过索引添加属性
// 只能放入元祖中已经声明过的属性
var tuple = ['1', 2, true];
tuple.push(true);
// 数组， 存放一类类型的集合
var arr1 = [1, 2, 3];
var arr2 = ['1', '3', '5'];
// 联合类型可以看作并集，既能使用数字，又能使用字符串
var arr3 = ['1', 3];
// 可以使用泛型
var arr4 = ['1', 1];
// 枚举类型 
// 默认可以正向取出，也可以反向取
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["USER"] = "a";
    USER_ROLE[USER_ROLE["ADMAIN"] = 1] = "ADMAIN";
    USER_ROLE[USER_ROLE["MANAGE"] = 2] = "MANAGE";
})(USER_ROLE || (USER_ROLE = {}));
console.log(USER_ROLE[1]);
console.log(0 /* ADMIN */);
