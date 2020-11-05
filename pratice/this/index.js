/**
this 取决于函数的调用方式
 */

var a = 1
var obj = {
    a: 2,
    test
}
function test() {
    console.log(this)
}

test()    // 1）作为普通函数调用，在非严格模式下，this指向window

obj.test()   // 2） 作为对象的方法调用，this 指向当前 对象obj

test.call(null)  // 3)  call、apply，bind绑定制定的this，指向传递的第一个参数， 如果是null，则指向window
 
let o = new test()  // 4) 作为构造函数调用，，this，指向当前创建的实例

setTimeout(test, 1000) // 5)作为回调函数调用，this指向window

//箭头函数没有自己的this指向，指向外层作用域


/**
 * 当作为构造函数有返回值调用时
 */


function Animal(name, age){
    this.name = name
    this.age = age
    // return {
    //     name:'0999'
    // }
}
Animal.prototype.say = function(){
    console.log(this.name)
}
function createNew (Ctor, ...args){
    let obj = {}
    // obj.__proto__ = Ctor.prototype
    Object.setPrototypeOf(obj, Ctor.prototype) // // 继承原型上的方法
    let result  = Ctor.call(obj, ...args)
    return result instanceof Object ? result : obj
}

let obj = createNew(Animal,'大象', 6 )

console.log(obj.say())