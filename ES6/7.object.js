// Object.assign  浅拷贝


// __proto__ 链
//  es6中可以在对象内，直接操作__proto__

let obj1 = { name: 'jack' }
let obj2 = { age: 18 }

// obj1.__proto__ = obj2
Object.setPrototypeOf(obj1, obj2)
// console.log(Object,getPrototypeOf(obj1))
console.log(obj1.age)