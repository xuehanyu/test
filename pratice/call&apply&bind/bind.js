// let obj ={
//     address : '北京'
// }

// function fn(...args){
//     this.age = '10'
//     console.log(this,'this')
//     console.log(this.address, ...args)  
// }


// Function.prototype.bind= function(context){
//     context = context || window
//     let bindArgs = Array.prototype.slice.call(arguments, 1)
//     let that = this
//     function Fn(){}
//     function fBound () {
//         let args = Array.prototype.slice.call(arguments)
//         that.apply(this instanceof fBound ? this : context, bindArgs.concat(args))
//     }
//     Fn.prototype = this.prototype
//     fBound.prototype = new Fn()
//     return fBound
// }

// fn.prototype.flag = 'flag'


// let bindFn = fn.bind(obj,0)
// // bindFn(1,2,3)

// let instance = new bindFn(1,3)
// console.log(instance.flag)

// //  1 bind方法可以绑定this指向，绑定
// //  2，bind方法返回一个并定后的函数（高阶函数）

// //  3 bind还有一个特点可以保存参数

// // 4. bind返回的函数可以当成类 调用  new bindFn()  如果绑定的函数呗new, 当前函数的this就是当前的实力
// //  5 new出来的结果可以继承原有类的原型




let obj = {
    name : 'objName'
}

function fn(...args){
    console.log(this.name)
    console.log(args)
}

fn.prototype.age = '122'

Function.prototype.bind = function(context){
    context = context || window
    let that = this  //  当前that 指的是fn函数
    function Fn(){}
    let bindArgs = [].slice.call(arguments, 1)  //  获取除了指定this的其余参数
    function fBound(){
        let args = [].slice.call(arguments)  //  获取全部参数
        that.apply(this instanceof fBound ? this : context, bindArgs.concat(args))
    }
    Fn.prototype = that.prototype
    fBound.prototype = new Fn()
    return fBound
}

//  bind函数的特点
//  改变this指向，返回一个新的函数
// 可以保存bind中的参数
//  如果通过绑定函数去new 一个对象，则当前函数中this会忽略bind传入的，而指向new 出来的实例
//  同样可以继承 类原型上的属性
let bindFn = fn.bind(obj,1)
// bindFn(2,3,4,5)
let instance  = new bindFn(2,3,4,5)

console.log(instance.age)

// map循环数组的每一个项，返回一个新的数组，不改变原来的数组
let arr = [1,2,3,4,5]
Array.prototype.some = function(fn){
    Array.prototype.every = function(fn){
        for(let i=0; i<this.length;i++){
          if(!this.hasOwnProperty(i)) continue
          if(!fn(this[i],i)) return false
        }
        return true
      }
    }
      let result = arr.every(item=>item>0)
      console.log(result)