//  创建对象的方式不同
// new object  通过构造函数来创建对象，添加的属性在自身实例上
let a = { name: 'jack' }
let b = new Object(a)
console.log(b)  
console.log(b.__proto__)
console.log(b.name)

// Object.create() 添加的属性在原型对象上
let a = { name: 'jack' }
let b = Object.create(a)
console.log(b)
console.log(b.__proto__)
console.log(b.name)

//  第二个不同 创建空对象时， 通过构造函数创建的空对象有原型对象， 而通过Object.create()则没有
let obj = new Object()
console.log(obj.__proto__)

let obj = Object.create(null)
console.log(obj.__proto__)

// 通过Object.create()第二个参数为新创建的对象添加属性时，默认confiruable enumrable writeable等都是false，
// 而通过字面量方法 如let age = { value:18 } 创建对象的属性时，描述符默认都是true