// es6提供了新的声明方式，替代了以前的var
//  let const 

// 一、var 不支持封闭作用域，声明到全局作用域上
// 1、函数作用域
// 2、全局作用域

// (function(){
//     for (var i=0; i<3; i++) {  // 当前i被封闭到函数作用域
//         console.log(i)  
//     }
// })()

// console.log(i)  
// console.log(window.i)

// for(var i=0; i<3; i++){
//     (function(i){
//         //  当前i保存在函数作用域内
//         setTimeout(()=>{
//             console.log(i)  // 
//         }, 1000)
//     })(i)
    
// }

// let 和{} 配合可以产生一个作用域
// let 支持块级作用域，声明的变量只会声明在当前作用域内
// for(let i=0; i<3; i++){
//     setTimeout(()=>{
//         console.log(i)  
//     }, 1000)  
// }
//  let可以解决作用域污染问题和局部作用域,不会声明到全局 window上

// 二、在同一个作用域下可以多次声明同一个变量
// let a = 1
// function b(){
//     let a= 2
//     console.log(a)
// }
// b()

//  Identifier 'a' has already been declared  变量被重复声明，如果用let声明过，就不要用var

//  三、域解释问题 变量提升(使用let 解决)
//  暂存死区, 如果作用域内有这样一个变量，那么这个作用域内就会绑定这个变量，不会继续向上查找

// console.log(a)
let a= 1

{
    console.log(a)
    let a = 2
}
// var a = 1
// {
//     console.log(a)
//     var a = 5
// }

// 四、通过const 声明的变量不能被修改，不能被修改引用空间，声明一个常量



