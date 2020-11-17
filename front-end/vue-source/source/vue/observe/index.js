import Observe from './observe'
import Watcher from './watcher'
import Dep from './dep'

export function initState(vm) {
    //  做不同的初始化工作
    const opts = vm.$options
    if (opts.data) initData(vm)   //  初始化数据
    if (opts.computed) initComputed(vm, opts.computed)   // 初始化计算属性
    if (opts.watch) initWatch(vm)   //  初始化watch
}

export function observe(data) {
    //  如果不是对象 或者 是null、undefined 不需要观察
    if (typeof data !== 'object' || data == null) return
    if (data.__ob__) {   // 已经被监控过
        return data.__ob__
    }
    // 通过这个类观察数据
    return new Observe(data)
}
function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })

}

function initData(vm) {  //将用户输入的数据，，通过Object.defineProperty重新定义
    let data = vm.$options.data  // 用户传入的data
    //  data有可能是函数，有可能是对象 或者没传
    //  vm._data  相当于data的一个副本，我们不破环原有的data，这样就可以进行操作
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
    for (let key in data) {  // 做一次代理，，当获取vm.msg 代理到vm._data.msg上
        proxy(vm, '_data', key)
    }
    // 重新定义，观察这些数据,Object.defineProperty
    observe(vm._data)
}

function creatComputedGetter(vm, key) {
    // 用户取值时会调用该方法
    // TODO 取出对应的watcher,并且判断
    return function(){
        let watcher = vm._watchersComputed[key]   // 我们定义的计算属性watcher
        if (watcher && watcher.dirty) {
            // TODO调用watcher的get方法  evaluate
            watcher.evaluate()
        }
        if(Dep.target){  //  如果当前有watcher，，将其存放在firstName 和lastName对应的watcher中
            watcher.depend()
        }
        return watcher.value
    }
}
// 计算属性，特点默认不执行，等用户取值的时候在执行，会缓存取值结果
// 如果依赖的值发生变化了，会更新dirty属性，，再次取值时，重新求值

// watch的方法不能用在模版中，，用于一些监控逻辑
// watcher有三类， 渲染watcher、用户watcher、 计算属性watcher lazy
function initComputed(vm, computed) {
    // TODO 创建存储计算属性的watcher对象 将计算属性的配置，放到vm上
    let watchers = vm._watchersComputed = Object.create(null)

    // TODO， 循环每个计算属性，并创建watcher实例，
    for (let key in computed) {
        //TODO new Watcher此时什么都不会做，只是配置了lazy， dirty属性，默认刚开始这个方法不会执行
        watchers[key] =  new Watcher(vm, computed[key], () => { }, { lazy: true })
        //TODO  在页面上会取这个计算属性，所以需要做一层代理，通过vm.fullName拿到
        Object.defineProperty(vm, key,{
            get:creatComputedGetter(vm, key)
        })
        // creatComputedGetter()
    }
}
function createWatcher(vm, key, handler, opts) {
    vm.$watch(key, handler, opts)
}
function initWatch(vm) {
     // msg(newValue, oldValue){
        //     console.log(newValue, oldValue)
        // }

        //  watch 还可以有handler的写法
        // msg:{
        //     handler: function (newValue, oldValue){
        //         console.log(newValue, oldValue)
        //     },
        //     immediate: true
        // }


    // TODO 获取用户传入的watch
    let watch = vm.$options.watch
    // TODO 获取handler 就是对应的函数
    for (let key in watch) {
        let userDef = watch[key]
        let handler = userDef
        if (userDef.handler) {
            handler = userDef.handler
        }
        createWatcher(vm, key, handler, { immediate: userDef.immediate })
    }
    //  创建watcher createWatcher， 内部最终也会使用$watche方法
}