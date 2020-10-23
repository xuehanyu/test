/**
 * 1、高阶函数
 * 1）一个函数作为另一个函数的参数
 * 2）一个函数返回一个函数
 * 3）闭包
 */

/**
 * 2、判断类型
 * 1) typeof 判断基础类型，无法判断对象类型
 * 2）constructor 判断是谁构造出来的，不够准确，修改继承关系
 * 3）instanceof 判断一个对象是某个构造函数的实例
 * 4）Object.prototype.toString.call()   返回字符串 '[object Array]'
 *
 */

function isType1 (type) {
  // 将'String'变量私有化当前作用域
  return function (content) {
    // 为了改变this指向
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}
//  使用箭头函数实现相同的功能
const isType = type => content => Object.prototype.toString.call(content) === `[object ${type}]`

//  高阶函数实现的第一个功能保存变量（闭包）
const isString = isType('String')
// 什么是闭包： 在定义的时候函数已经决定所在的作用域，，，，，一个函数不再自己所在作用域下执行
console.log(isString('hello'))

// console.log(isType('hello', 'String'))
// console.log(isType(123, 'Number'))


// ----------------回顾------------------

let isType = (type) => (content) => Object.prototype.toString.call(content) === `[object ${type}]`
let isNumber = isType('Number')
console.log(isNumber(1111),'--')