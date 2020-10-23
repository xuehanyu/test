

//如果直接返回的是对象类型，需要加()
function a(b){
    return function(c){
        return b+c
    }
}

let a = b => c => b+c
console.log(a(1)(2))


let a= 100   // let 有自己的作用域，不会污染全局环境 所以window.a 是undefined
let obj = {
    a: 10,
    // say: function(){
    //     setTimeout(function(){
    //         console.log(this.a)  // undefined
    //     },1000)
    // }
    // say: function(){
    //     setTimeout(()=>{
    //         console.log(this.a) // 10 箭头函数没有this指向，向外层作用域查找
    //     },1000)
    // }
     say: ()=>{
        setTimeout(()=>{
            console.log(this.a) // undefined 箭头函数没有this指向，向外层作用域查找
        },1000)
    }
}

obj.say() // 谁调用 此方法 this就指向谁

// 1、箭头函数没有this指向，向外层作用域查找
// 2、箭头函数没有arguments，可以自己创建
let a = (...arguments)=>{
    console.log(arguments)
}
a(1,2,3)
