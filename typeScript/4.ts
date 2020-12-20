/**
 * 装饰器
 */
// 类装饰器
export { }
namespace a {
    function addNameEat(constructor: Function) {
        constructor.prototype.name = 'jack'
        constructor.prototype.eat = function () { }
    }

    @addNameEat
    class Person {
        name: string
        eat: Function
        constructor() { }
    }

    let p: Person = new Person()
    // console.log(p.name)
    p.eat()
}

// 类装饰器工厂
namespace b {
    function addNameEatFactory(name: string) {
        return function addNameEat(constructor: Function) {
            constructor.prototype.name = name
            constructor.prototype.eat = function () { }
        }
    }
    @addNameEatFactory('hello')
    class Person {
        name: string
        eat: Function
        constructor() { }
    }
    let p: Person = new Person()
    // console.log(p.name)
    p.eat()
}

// 返回一个类
// 可以多，不可以少，类型安全
namespace c {
    function replaceClass(constructor: Function) {
        return class {
            name: string
            eat: Function
            age: number
        }
    }

    @replaceClass
    class Person {
        name: string
        eat: Function
        constructor() { }
    }
    let p: Person = new Person()
    // console.log(p.name)
    // p.eat()
}


// 属性装饰器
namespace d {
    function upperCase(target: any, propertyKey: string) {
        console.log(target, propertyKey)
        let value = target[propertyKey]
        const getter = () => value
        const setter = (newValue: string) => { value = newValue.toUpperCase() }
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            })
        }
    }
    function staticPropertyDecorator(target: any, propertyKey: string) {
        console.log(target, propertyKey)
    }
    function noEnumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target, propertyKey)
    }
    function toNumber(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let oldMethod = descriptor.value
        descriptor.value = function (...args: any[]) {
            args = args.map(item => parseFloat(item))
            return oldMethod.apply(this, args)
        }
    }
    class Person {
        @upperCase
        name: string = 'jack'  // 实例属性
        @staticPropertyDecorator
        static age: number = 10  // 静态属性
        @noEnumerable
        getName() { // 实例方法
            return this.name
        }
        @toNumber
        sum(...args: any[]) {// 实例方法
            return args.reduce((accr: number, item: number) => accr + item, 0)
        }
    }
    let p: Person = new Person()
    console.log(p.sum('1', '2', '3'))
}


// 参数装饰器
namespace e {
    // 在IOC容器中大放异彩，NEXT.js 用到大量参数装饰器
    /**
     * @param targe 静态成员就是构造函数， 非静态成员就是构造函数的原型，  
     * @param methodName 方法的名称
     * @param paramIndex 参数的索引
     */
    function addAge(targe: any, methodName, paramIndex: number) {
        console.log(targe, methodName, paramIndex)
        targe.age = 10
    }
    class Person {
        age: number;
        login(name: string, @addAge password: number) {
            console.log(this.age, name, password)
        }
    }
    let p: Person = new Person()
    p.login('1', 18)
}


// 装饰器的执行顺序  先上后下 先内后外
/**
 * 类装饰器最后执行，后写的先执行
 * 方法和属性的装饰器限制性
 * 方法和属性装饰器，谁在前面谁先执行
 */