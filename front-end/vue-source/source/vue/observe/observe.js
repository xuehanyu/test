import { observe } from './index';
import { arrayMethods, observerArray, dependArray } from './array'
import Dep from './dep';
//TODO： 为每个属性，增加一个依赖
export function defineReactive(data, key, value) {  // 定义响应式数据变化
    // 不支持ie8 以及一下
    // 如果value可能还是对象，再去监控内部的对象
    let childOb = observe(value)
    // 收集依赖，，收集的是当前watcher
    // 相同属性具有相同的dep
    let dep = new Dep() // dep里可以收集依赖，收集的是watcher，每一个属性都增加一个dep实例
    Object.defineProperty(data, key, {
        //  依赖收集！！！
        get() {
            //  收集依赖，进行判断 是否有target
            //  我们希望存入的watcher不能重复，如果重复会造成更新时多次渲染
            if (Dep.target) {
                dep.depend()  //dep.depend()  实现多对多的关系，，dep中可以存watcher， watcher中存放dep
            }
            if(childOb){   // 数组的依赖收集，
                childOb.dep.depend()
                // 数组种可能还有数组，需要递归进行依赖收集
                dependArray(value)
            }
            return value
        },
        // 通知依赖更新
        set(newValue) {
            if (value === newValue) return
            value = newValue
            // 如果设置的是一个对象的也应该检测
            observe(newValue)
            // TODO：数据发生变化，发布，将刚才watcher重新执行
            dep.notify()
        }
    })
}

class Observe {
    //  这里的data有可能是对象，有可能是数组
    constructor(data) {  // data 就是刚才定义的vm._data  
        //  将用户的数据使用Object.defineProperty重新定义, 通过walk函数循环重新定义
        this.dep = new Dep()  // 在observe的实例上定义,专门为数组而用
        Object.defineProperty(data, '__ob__',{   //  在每一个对象定一个__ob__属性，专门为数组使用
            get : () => this
        })
        if (Array.isArray(data)) {  // 需要重写push方法等
            //  只能拦截数组的方法， 数组里的每一项也需要观测
            data.__proto__ = arrayMethods   //  让数组通过原型链，调用自己重写的数组的方法
            observerArray(data)
        } else {
            this.wark(data) // 针对data是对象
        }
    }

    wark(data) {
        // 不能使用for in 循环，以免将原型上属性也观测了，所以可以取key
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let value = data[key]
            defineReactive(data, key, value)
        }
    }
}

export default Observe