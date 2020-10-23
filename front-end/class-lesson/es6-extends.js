class Animal {
    constructor(name){
        this.name = name
        if(new.target === Animal){
            throw new Error('not new')   //  类的实例话检测
        }
    }
    static a(){   //  子类可以继承到父类的静态方法 Tiger.__proto__ = Animal
        return 100
    }
    say(){   // 
        console.log('父类say')
    }
}

class Tiger extends Animal {
    constructor(name){ // 可以省略，如果省略直接调用父类的constructor
        super(name)  // 相当于 Animal.call(this), 继承实例的属性
    }

    say(){  //  在原型方法中，super相当于 Animal.prototype
        super.say()
        // console.log('子类的方法')
    }

    static b(){   //在静态方法中 super 指的父类
        console.log('bbb')
        super.a()
    }


}

//  抽象类，可以被继承，但是不能被new，不能被实例话的类就是抽象类
let animal = new Animal()
let tiger = new Tiger('老虎')  // 当子类中没有constructor 能够接受参数时，会查找父类，父类接受参数
Tiger.b() 
