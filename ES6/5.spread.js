//  ES6中的 ...有2个含义，扩展运算符、剩余运算符

// 1 扩展运算符

// 数组展开
// function test(a,b,c){
//     console.log(a,b,c)
// }

// let arr = [1,2,3]

// test(...arr)

//  合并数组

// let arr1 = [1,2,3,4,5]
// let arr2 = [...arr1, 6,7,8]
// console.log(arr2)

// 拆分字符串

// let str = 'hello'
// console.log(...str)


//  剩余运算符

// 传参，当函数参数个数不确定时，用...

// function test(...args){ 
//     console.log(args)  //  将所有参数放在一个数组里[1,2,3,4,5]
// }

// test(1,2,3,4,5)

// function test(item, ...args){
//     console.log(args)   // [3,43,6,7,9]
// }

// test(1,3,43,6,7,9)


//  解构使用

// let [a, ...temp] = [1,2,3,5]
// console.log(temp)
// console.log(a)


// function test(args){
//     console.log({...args})
// }

// test({a:1,b:3})


