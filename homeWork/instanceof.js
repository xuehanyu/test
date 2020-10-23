function Animal (){
    this.name = '动物'
}

let animal = new Animal()


function instance_of(l, r){   //  左边是对象，右边是函数
    if(typeof r !== 'function') throw new Error('instance error')
    if(!l || (typeof l !=='object' && typeof l !== 'function')) return false
    l = l.__proto__
    r = r.prototype
    while(true){
        if(l ===null) return false
        if(l === r) return true
        l = l.__proto__
    } 
}


console.log(instance_of(animal, Animal))