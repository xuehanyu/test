function Animal(name) {
    this.name = name
}

Animal.prototype.say = function(){
    console.log('say')
}

function createNew(Cons, ...args){
    let obj = {}
    Object.setPrototypeOf(obj, Animal.prototype)
    let result = Cons.call(obj, ...args)
    return result instanceof Object ? result : obj
}


let animal = createNew(Animal, '小老虎')

console.log(animal)
// animal.say()