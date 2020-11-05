//   prototype 、 __proto__ 、 constructor

// es5中没有类，只有构造函数，可以把一个函数当成类


// 用es5来模拟es6的类， 
// 1）判断当前这个调用方式是不是通过new来调用
// 2) Es6类上的原型方法是不可以枚举的, 而构造函数prototype上的方法是暴露出来的  Animal.prototype
// 3）ES6只支持静态方法，不支持静态属性，，ES7支持静态属性
// class Eat{
//   a(){}   //  原型上的方法
//   static a(){ return 123 }  // ES6可以通过函数实现静态属性
//   static b = 2    //  es7支持
// }
 
function define(target, protoProperties){
    for(let i = 0 ;i< protoProperties.length; i++){
        let property =  protoProperties[i]
        Object.defineProperty(target, property.key, {
            enumerable:false,  // 不可以枚举
            writable:true,
            configurable: true,
            ...property
        })
    }
}

function defineProperty(constructor, protoProperties, staticProperties){   //  babel编译出来
    if(Array.isArray(protoProperties)){
        define(constructor.prototype, protoProperties)
    }
    if(Array.isArray(staticProperties)){  //  定义类的静态方法
        define(constructor, staticProperties)
    }
}

var Animal = (function(){
    function Animal(){
        if(!(this instanceof Animal)){  //  类的调用检测
            throw new Error('no new')
        }
        this.name = '熊猫'  //  实例上的属性
    }
    defineProperty(Animal, [  //  在原型上定义公共方法
        {
            key:'say',
            value: function(){console.log('say')}
        },
        {
            key:'eat',
            value: function(){console.log('eat')}
        }
    ],[
        {
            key: 'a',
            value: 122
        },
        {
            key: 'b',
            value: function(){return 666}
        }
    ]
    )
    return Animal
})()


// Animal.a = 1;
// Animal.b = 2   // 通过类来调用的叫静态属性 / 方法
let animal = new Animal()  // 构造函数中的this默认指向实例
// 如果new这个类，返回的是一个引用类型 functions object 这个this就会指向当前返回的结果
console.log(Animal.a, Animal.b())