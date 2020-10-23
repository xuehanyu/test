/**
 * 对某些函数进行扩展 面向切片编程
 */

//  举个例子，在说话之前先刷牙，借助before高阶函数，而不能在原有函数基础上去改
function say(who) {   //  把原来的函数进行了包装，扩展了原有功能
    console.log('say' + who)
}

Function.prototype.before = function (callback) {   //  统一扩展公共方法
    // ...args 剩运算符 当前参数的数组['我']
    return (...args) => {  //  所谓的newSay函数  使用箭头函数，使this指向指say  谁调用这个方法，this就是谁，箭头函数中没有arguments
        callback()
        //  展开运算符
        this(...args)
    }
}

let newSay = say.before(() => {    // before是一个高阶函数，参数是一个函数，同时返回的也是一个函数
    console.log('刷牙')
})

newSay('我')



function say(who) {
    console.log('say' + who)
}

Function.prototype.before = function (fn) {
    return (...args) => {
        fn()
        this(...args)
    }
}


let newSay = say.before(() => {
    console.log('刷牙')
})

newSay('我我我我我')
