// let age  = 20

// function fn(){
//     console.log(this.age)
// }
// let obj = {
//     age: 200
// }

// let obj2 = {
//     age: 100
// }
// Function.prototype.newCall = function(context, ...args){
//     const fn = this
//     context.fn = fn
//     let result = context.fn(...args)
//     console.log(...args, 'ag')
//     delete context.fn
//     return result
// }


// fn.newCall(obj2, '1','2','3')


function fn1(){
    // console.log(this)
    console.log(1)
}

function fn2(){
    console.log(2)
}

// Function.prototype.call  = function(context, ...args) {
//     context = context ? Object(context) : window
//     context.fn = this
//     context.fn(...args)
//     console.log(...args)
//     delete context.fn
// }

// fn1.call(fn2, 1, 2,3)   //  不允许 this = 'hello'  可以xxx.fn1()   谁调用this指向谁


Function.prototype.apply  = function(context, args) {
    context = context ? Object(context) : window
    context.fn = this
    let result = context.fn(...args)
    console.log(...args)
    delete context.fn
    return result
}
fn1.apply(fn2, [1,2,3])   //  不允许 this = 'hello'  可以xxx.fn1()   谁调用this指向谁



// call的特点：
// 1）可以改变当前函数的this指向
// 2）还会让当前函数执行

//  如果有多个call会让call方法执行， 并且把call中的thi改成fn2




