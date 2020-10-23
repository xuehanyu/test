function Person (name,age){
    this.name = name
    this.age = age
}

let p = new Person('jack', 18)
// console.log(p.name)
/***
 * new的原理
 * 首先函数接受不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
 * 首先内部创建一个 obj{}
 * 设置该对象的原型，以达到继承，（因为obj对象需要访问构造函数原型链上的属性，所以可以通过setPrototype或者__proto__设置）
 * 执行构造函数，将obj绑定到构造函数上，并且传入剩余的参数
 * 判断构造函数的返回值是否为对象，如果是对象就使用构造函数的返回值，如果不是则用obj，这样就实现了忽略构造函数返回的原始值
 * 
 */


 /**
  * 创建一个new操作符的步骤
  * @param {*} Con 构造函数
  * @param  {...any} args 剩余参数
  */
function createNew(Con, ...args){
    let obj = {}
    Object.setPrototypeOf(obj, Con.prototype)
    // 设置原型对象 等价于 obj.__proto__ = Con.prototype
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj
}


let p2 = createNew(Person, 'li', 11)


/**
 * 一、new操作符的几个作用
 *  1、new操作符返回一个对象，所以我们需要内部创建一个对象
 *  2、这个对象也就是构造函数中的this，可以访问到挂载在this上的任意属性
 *  3、这个对象可以访问到构造函数原型链上的属性，所以需要将对象与构造函数链接起来
 *  4、返回原始值需要忽略，返回对象需要正常处理
 * 
 * 二、new操作符的特点
 *  1、new通过构造函数Test创建处理的实力可以访问构造函数中的属性也可以访问构造函数原型链上的属性，所以通过new操作符
 *    实例与构造函数通过原型链链接了起来
 *  2、构造函数如果返回原始值，那么这个返回值毫无意义
 *  3、构造函数如果返回对象，那么这个返回值会被正常使用，导致new操作符没有作用
 */