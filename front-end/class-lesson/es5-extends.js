// es5继承
// 定义一个类，实例属性、原型属性


function Animal() {   // 
    this.name = '动物'
}
Animal.prototype.say = function () {
    console.log('say')
}

function Tiger() {
    Animal.call(this)  //   实现实例属性的继承，  调用构造函数，改变this的指向
    this.age = 10
}
//  实现原型继承的三种方法
// 1） 不会改变子类的constructor
// Tiger.prototype.__proto__ = Animal.prototype   //  实现原型属性的继承
// 2）等价于 Object.setPrototypeOf ES6的写法  不会改变子类的constructor

// Object.setPrototypeOf(Tiger.prototype, Animal.prototype)
function create(parentClass) {
    function Fn() { }
    Fn.prototype = parentClass
    return new Fn()
}
// 3） Object.create()   原来是利用一个新的构造函数，缺点是子类的constructor 指向父类
// Tiger.prototype = Object.create(Animal.prototype, {
// constructor: {value: Animal}
// })

// 4）设置子类的原型对象为父类的实例 会改变
// Tiger.prototype = new Animal()
let tiger = new Tiger()
console.log(tiger.name)
tiger.say()
console.log(Tiger.prototype.constructor)

//  ES6的类 实现继承是考 call + Object.create = extends


// console.log(Object.prototype.__proto__)   // null
// console.log(Object.__proto__ === Function.prototype)   // true
// console.log(Function.prototype.__proto__ === Object.prototype)   // true

// // 所以
// console.log(Function.__proto__ === Object.__proto__)   // true



// 利用该方法实现继承的例子
function Animal() {
    this.name = '动物'
    this.sex = 'femal'
}

Animal.prototype.say = function () {
    console.log('i can say')
}

function Tiger() {
    Animal.call(this)  // 继承了父类的属性
    this.age = 8
}
// 实现继承的其中一种方式
// Tiger.prototype = Object.create(Animal.prototype, {
//     constructor: {
//         value: Tiger
//     }
// })

Tiger.prototype.__proto__ = Animal.prototype

let tiger = new Tiger()

console.log(Tiger.prototype.constructor)