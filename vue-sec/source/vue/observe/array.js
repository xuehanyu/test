//  这个文件重新定义数组的一些原生方法，并实现对数组的递归监测

import { observe } from "."

let oldArrayMethod = Array.prototype


export let arrayMethod = Object.create(oldArrayMethod)


// 一些改变原数组的方法
let methods = [
    'push',
    'shift',
    'pop',
    'unshift',
    'reverse',
    'sort',
    'splice'
]


export function observeArray (inserted){
    for(let i=0; i<inserted.length; i++){
        observe(inserted[i])
    }
}

methods.forEach(method => {
    arrayMethod[method] = function(...args){
        let r = oldArrayMethod[method].apply(this, args)
        let inserted
        switch(method){
            case 'push':
            case 'shift':
            case 'unshift':
                inserted = args
                break
            case 'splice' :
                inserted = args.slice(2)
                break
        }
        console.log('更新数据')
        if(inserted)  observeArray(inserted)
        return r
    }
})