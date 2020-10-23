// ES6中的模块化问题  
//  什么叫模块，只要是一个js文件 他就是一个模块
//  模块化解决的问题： 命名冲突(命名空间) 采用自执行难函数的方式，解决代码的高内聚，低耦合
// node中自带的的模块功能   require module.exports  commonjs 规范  

// cmd seaJs  amd requirejs  
//  umd 统一模块

//  常用的三种： node模块 commonjs规范 (require、module.exports)、  es6模块规范 (exports import) \ esModule umd

// es6 => node模块，在webpack环境下可以通用

//  如果通过相对路径引入，表示引入自定义模块

// import 的特点
// 1）可以变量提升，在没定义之前可以直接使用
// 2）不可以放在作用域中， 只能放到顶层环境


import { a, b, c } from './a'   //  从导出的对象中一个个取出

import * as obj from './a'   //  将所有导出内容作为obj对象导出，


setInterval(() => { //每次拿到的是这个变量对应的值，如果这个值变了那么结果会变
    console.log(obj.a, obj.b, obj.c, obj.default)
}, 1000);

//  默认导出
import obj, { a, b, c } from './a'   //  obj 作为默认导出的值，如果还想倒入其他的，可以在解构赋值

import {a, b, c, default as d } from './a'


//  export 导出的是接口，变量，   export default 导出的具体的内容， 不能改变其值
//  导入的变量不能修改


//  默认import 语法叫静态语法（文件一加载默认会先去家在对应文件）， 

//  动态加载（草案中，提供了import（），可以实现懒加载）

let btn = document.createElement('button')

btn.addEventListener('click', function(){
    let result = await import('./a')  // 动态导入a这个文件，返回的是一个promise
    console.log(result)  // 动态加载文件
})

document.body.appendChild(btn)