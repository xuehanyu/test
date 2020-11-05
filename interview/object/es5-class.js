/**
 * 通过es5的方式 实现class
 */
function define(target, properties){
    for(let i=0; i< properties.length; i++){
        let propertyItem = properties[i]
        Object.defineProperty(target,propertyItem.key, {
            enumerable: false,
            configurable: true,
            writable: true,
            ...propertyItem
        } )
    }
    
}
function defineProperty(Ctor, protoProperties,staticProperties){
    if(Array.isArray(protoProperties)){
        define(Ctor.prototype, protoProperties)
    }
    if(Array.isArray(staticProperties)){
        define(Ctor, staticProperties)
    }
}
var Animal = (function(){
    function Animal(){
        if(!(this instanceof Animal)){
            throw Error('必须通过new调用')
        }
    }
    defineProperty(Animal, [
        {
            key: 'say',
            value: function(){ console.log('say') }
        },
        {
            key: 'b',
            value: 'bbb'
        }
    ], [
        {
            key: 'a',
            value: 'aaaa'
        },
        {
            key: 'd',
            value: function(){ return 666}
        },

    ])  // 在原型上以及类上定义方法
    return Animal
})()


const  objClass = new Animal()
console.log(objClass.say(),objClass.b ,Animal.d(), Animal.a)