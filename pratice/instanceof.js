function instance_of(L, R){
    //  错误判断，构造函数必须是一个function 其他的报错
    if(typeof R !== 'function') throw new Error('instance error')
    if(!L || (typeof L !=='object' && typeof L !== 'function') ) return false
    let l = L.__proto__
    let r = R.prototype
    while(true){
        if(l===null) return false
        if(l===r) return true
        l = l.__proto__
    }
}

function Person (){
    this.name = 'name'
}
let p = new Person()
console.log(instance_of(p, Person))


//  typeof 和instanceof 区别 ？

// 1）typeof 6中 typeof null === 'object'
// 2) [] {} ref function    如果是函数，返回的是function 其他都是object


// Object.prototype.toString.call()  只能校验当前存在的类型 如[object Function] 并不能校验自定义类型
 
//  instanceof 


function Animal(name, age){
    this.name = name
    this.age = age
}
Animal.prototype.say = function(){
	console.log('say hello')
}

let animal = new Animal('dog',3)
// console.log(animal)
// animal.say()

function creatNew(Con, ...args) {
    let newObj = {}
    newObj.__proto__ = Con.prototype  // 继承原型上的方法
    // 
    let r = Con.apply(newObj, args)
    if(typeof r === 'object') return r 
    return newObj
}

creatNew(Animal, 'dog',3)

