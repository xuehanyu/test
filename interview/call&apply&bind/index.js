// call && apply && bind
let obj = { 
    name: 'jack'
}
let name = 'global'
function fn(name, age){
    console.log(this.name + '有一个' + name + age + '岁了')
}
fn.prototype.say = function(){
    console.log('say')
}
Function.prototype.call = function(context, ...args){
    context = context ? Object(context)  : window
    context.fn = this // this指的是当前函数
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.apply = function(context, args){
    context = context ? Object(context)  : window
    context.fn = this // this指的是当前函数
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.bind = function(context){
    context = context ? Object(context)  : window
    let that = this
    let bindArgs = Array.prototype.slice.call(arguments, 1)
    function Fn(){}
    let fnBound = function(){
        let innerArgs = Array.prototype.slice.call(arguments, 0)
        that.apply(this instanceof fnBound ? this : context, bindArgs.concat(innerArgs))
    }
    Fn.prototype = this.prototype
    fnBound.prototype = new Fn()
    return fnBound
}

fn.call(obj, '猫', 8)  // 改变this指向，传递参数序列化，形式传参数

fn.apply(obj, ['狗', 10]) // apply同样可以改变this指向，但是传递参数以数组形式传递

let fnBind = fn.bind(obj, '兔子')  // bind 可以给遍this指向，懒执行，返回一个绑定的函数，可以保存参数，并不同阶段传递，返回的函数可以通过new 调用，this指向当前实例
let instance = new fnBind('12')  // 通过new 出来的一个对象，当前实例可以继承原函数的属性和方法
instance.say()  // 当亲啊