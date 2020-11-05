// // es5 继承
// 原型链继承： 缺点，原型中包当属性是引用类型是，多个实例公用， 不能给父构造函数传递参数
function SuperType (){
    this.color = ['yellow', 'black']
}
function SubType(){}
SubType.prototype = new SuperType()
let intance1 = new SubType()
let intance2 = new SubType() // 两个实例公用colors
// 构造函数继承：可以传递参数 缺点，方法不能得到共用，没创建一个实例的时候，都会为该实例开辟内存绑定一个新的方法
function SuperType (name){
    this.name = name
    this.color = ['yellow', 'black']
}
function SubType(){
    SuperType.call(this, 'jack')
}
let intance3 = new SubType()
let intance4 = new SubType()

// // 组合式继承  原型链（原型属性和方法） + 构造函数（实例属性）
// //  缺点是 父构造函数调用两次，效率低，导致 name属性在Child原型上，并在同时存在每个Child实例上
// function Person(name){
//     this.name = name
// }

// Person.prototype.say = function(){
//     console.log('say')
// }

// function Child(address){
//     Person.call(this, 'child')  //第二次调用父构造函数
//     this.address = address
// }

// Child.prototype = new Person()  // 第一次调用父构造函数，使得Child.prototype.name = undefined
// Child.prototype.eat = function(){
//     console.log('eat')
// }
// let child = new Child('北京')



// 组合寄生式继承， 解决了父构造函数调用两次

function Person(name){
    this.name = name
}

Person.prototype.say = function(){
    console.log('say')
}

function Child(address){
    Person.call(this, 'child')  //第二次调用父构造函数
    this.address = address
}
// 此处是利用Object.create()的原理

function Fn (){}
Fn.prototype = Person.prototype
Child.prototype = new Fn()  // 第一次调用父构造函数，使得Child.prototype.name = undefined
Child.prototype.construtor = Child
Child.prototype.eat = function(){
    console.log('eat')
}
let child = new Child('北京')
// console.log(child.say())


// Object.create也可以实现继承（原型式继承），基于对象创建一个新的对象，缺点 ，当属性是一个引用类型实，多个实例共用

Object.create = function(obj){
    function Fn (){}
    Fn.prototype = obj
    return new Fn()
}

// 除了create 可以用Child.prototype.__proto__ = Person.prototype  不改变constructor
// 此方法相当于 Object.setPrototypeOf(Child.prototype, Person.prototype )


// es5实现class 
/**
 * es6中class 的类只能通过new 调用
 */