//  主要要做的事情就是拦截用户调用push pop shift unshift splice sort reverse ()

import { observe } from "."

//  其他不会改变原数组

// 先获取老得数组方法，只改写这7个方法
let oldArrayProtoMethods = Array.prototype

// oldArrayProtoMethods.push()  并不能直接改写原型上的方法，不然其他数组会有影响

// 通过拷贝，一个新的对象，可以查找老得方法
export let arrayMethods = Object.create(oldArrayProtoMethods)
let methods = [
    'push',
    'shift',
    'pop',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

export function  observerArray(inserted){  //  循环数组，对数组中的每一项进行观测
    for(let i=0; i<inserted.length; i++){
        observe(inserted[i])
    }
}

export function dependArray(value){
    for(let i=0; i<value.length;i++){
        let currentItem = value[i]
        currentItem.__ob__ && currentItem.__ob__.dep.depend()
        if(Array.isArray(currentItem)){
            dependArray(currentItem)
        }
    }
}

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        let r = oldArrayProtoMethods[method].apply(this, args)
        let inserted
        //  对于新增的如果是对象也要进行观察
        switch (method) {
            case 'push':
            case 'shift':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
                break;
        }
        if(inserted) observerArray(inserted)
        // 当数组放生变化时，通知页面进行更新
        this.__ob__.dep.notify()
        return r
    }

})
