// 如何用proxy来实现响应式原理


let obj = {
    name:{
        name: 'jack'
    },

    arr :['吃', '喝', '玩']
}

// ES6 Proxy 兼容性差， 可以代理13种方法 set get
//  defineProperty他还能对待定的属性，进行拦截

let handler = {
    //  target 就是原对象，key就是当前取的那个值
    get(target, key){
        // console.log('收集依赖')
        if(typeof target[key] === 'object' && target[key] !== null){
           return new Proxy(target[key], handler)
        }
        // return target[key]
        //  Reflect 反射，这个方法包含了很多的pai
        return Reflect.get(target,key)
    },

    set(target, key, value){
        //  数组设置，首先对其索引进行更新，然后对其length属性进行更新
        let oldValue = target[key]
        if(!oldValue){ // 新增属性
            console.log('新增属性')

        } else if(oldValue !== value){
            console.log('修改属性')
        }
        // console.log(key, value)
        // console.log('设置更新')
        // target[key] = value 设置时，如果设置不成功，不报错，对象不可配置的不能设置
        return  Reflect.set(target, key, value)
    }
}

let proxy = new Proxy(obj, handler)
//  懒代理，当取值的时候才会取代理
// proxy.name.name = 123

//  修改数组
proxy.arr[0]= 9
console.log(proxy.arr)
