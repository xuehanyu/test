//  js作用域 在没有let之前 全局 、 函数 、 eval

//  js的作用域 是静态的  在定义时决定而不是执行时

// 执行函数时，会产生 执行上下文 EC

//  上下文分为两大类，全局上下文，函数上下文


// 上下文重要的三个特点： 变量对象 Variable VO 、 作用域链、  this


//  vo （由js引擎实现的，，并不能直接访问到）  全局上下文 var a = 1 ,其实a就声明到了vo中


// var a = 100
// function sum (){

// }

// vo(globalContext){
//     a: 100,
//     sum : ref to function sum
// }


//  执行上下文的周期： 创建阶段，代码执行阶段


function sum (a, b){
    var c = 10;
    var d = function(){}   // 表达式
    function total(){}    //  函数声明
    function total(){}   
    var total  // 如果变量已经存在了，不会覆盖，不会干扰已经存在的变量
    b = 10
}

sum(10)
// VO + arguments => AO
//  创建阶段会把vo声明出来，会把vo激活，激活所谓的AO VO 和 AO 是同一个对象，可以理解不同阶段干不同的事



// 1、找形参, 没有实参，就用undefined来替代
// 2、会查找函数声明
// 3、查找变量声明

//  创建阶段就是预解释阶段
// void(sum){
//     a: 10,
//     b: undefined，
//     total: ref to function total   //  如果函数名称相同，会将后面的把前面的覆盖掉
//     d: undefined
// }