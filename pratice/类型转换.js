//  说一下js中类型转化规则？


// if()  true / false   false的值：''、0、undefined、null、NaN, 其余的值就都是true

// ！可以把这个值 ， 转换成boolean

// 运算 +(字符串拼接) -  * /

// 运算 字符串拼接
// 1）数字和非字符串相加  Null 转换为number为0， undefined ===> NaN

// console.log(1 + {})  // 1[object Object]

//  2) 非数字相加
// console.log(true + true)   // 2

// console.log(true + {})   // true[object Object]


// // 对象中有两个方法 valueOf  toString()


// // 比较运算 >  =  < 
// console.log('a'.charCodeAt(0))
// console.log('b'.charCodeAt(0))
// console.log('a' < 'b')   // ascii 进行比较

// console.log(1<'123')   //  字符串转换成数字

// console.log(1 < 'aaa')   // 如果不能转换数字，就返回false

// == 
console.log(null == undefined)   

//  null和undefined和其他类型比较都返回false
console.log(null == 0)
console.log(undefined == 0)


console.log({}=={})   // 比较的是引用空间，不想等

console.log(NaN === NaN)   // 唯一一个自身不等于自身的

//  
console.log('1' == 1)  // 字符串转换成数字

//如果是布尔类型，会将其转换成数字
console.log(1 == true)

//  对象和 字符串 数字 比较的时候 ，会将当前的对象转换成原始数据类型
console.log({} == '[object Object]')


// [] = ![]   单目运算符优先级最高
// 1） 1[]  ==> false

//  [] == 0

// 2) [] 转换成 字符串

//  3) ''  == 0
//  结果 想等