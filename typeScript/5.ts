export { }
abstract class Animal {   // 抽象类
    name: string
    abstract speak(): void  // 抽象方法
}

// 多态 同一个方法 不同的子类有不同的实现

class Cat extends Animal {
    speak(): void {  // 实现父类的抽象方法
        console.log('miii')
    }
}

class Dog extends Animal {
    speak(): void {  // 实现父类的抽象方法
        console.log('dog')
    }
}
let cat: Cat = new Cat()

cat.speak()


/**
 * 重写（override）:子类重写继承自父类的方法
 * 重载（overload）:函数重载，一个函数有个定义
 */
function dobule(val: number)
function dobule(val: string)
function dobule(val: any) {
    if (typeof val === 'number') {
        return val * 2
    } else if (typeof val === 'string') {
        return val + val
    }
}

dobule(2)
dobule('222')
