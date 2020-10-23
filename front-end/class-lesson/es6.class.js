class Animal {
    constructor(){
        this.name = 'animal'
    }
    say(){  
        console.log('say')
    }
    static a(){
        return 111
    }
    // Animal.b = 666  类上的属性
    static get b(){   // 属性访问器
        return 666
    }
    // Animal.prototype.d = 1233
    get d (){  //  原型上的属性
        return 1233  
    }

    static c = 1
}
let a = new Animal()
console.log(a, a.say(), Animal.a(), Animal.b, Animal.c)


