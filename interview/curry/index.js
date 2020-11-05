/**
 * 函数柯里化: 把一个函数的范围缩小，让函数变得更具体
 * 
 */



//判断类型
function checkType(type, content){
    return Object.prototype.toString.call(content) === `[object ${type}]`
}
function isType(type) {
    // 私有化，这个函数，可以拿到上层函数的参数，这个空间不会被释放
    return function (content) {
        // 闭包，函数在某个作用域下声明好了，声明好了之后并没有在当前作用域内调用，而是在外界作用域下被调用，
        // 在外面调用的时候，当前函数的外层作用域就不会被释放掉，我们就可以拿到外层作用域的变量， 形成了闭包
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}

isString = isType('String')  // 可以批量产生这个方法，创建一个更具体的函数
let flag = isString('aaaa')

// 如何实现通用的函数柯理化
function add(a, b, c, d, e) {
    return a + b + c + d + e
}

function curring(fn, arr = []){
    let length = fn.length
    return function(...args){ // [2]
        arr = arr.concat(args)   // [1,2]
        if(arr.length<length){
            return curring(fn, arr)
        } 
        return fn(...arr)
        
    }
}
let currFn = curring(add,[1,3])

console.log(currFn(2)(4)(6));
// console.log(currFn(12)(3,4)(5)(8))
// console.log(currFn(1,2)(3,4)(5))
// add(1, 2, 3, 4, 5)

function checkType(type, content){
    return Object.prototype.toString.call(content) === `[object ${type}]`
}

let util = {};
//柯理化应用场景 将判断类型柯理化，生成一个工具类
['Number','String','Boolean'].forEach(item=>{
    util['is'+item] = curring(checkType)(item)
})

let r = util.isString('helloo')
console.log(r,'r')

//函数反柯理化，，是让一个函数的范围变大
// Object.prototype.toString()
// toString()  
// console.log(Object.prototype.toString.call(true))

function unCurring(fn){
    return function(...args){
        return fn.call(...args)
    }
}

let toString = unCurring(Object.prototype.toString)
console.log(toString(true))