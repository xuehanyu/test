
import Observe from './observe'
export function initState(vm){
    //  针对不同的属性进行初始化
    let opts = vm.$options
    if(opts.data) initData(vm)
    if(opts.computed) initComputed(vm)
    if(opts.watch) initWatch(vm)
}

export function observe(data){
    //如果data 是 undefined 和 null 不需要检测
    if(typeof data !=='object' || data == null) return 
    new Observe(data)
}   
function proxy(vm, source,key){  // 可以实现vm.msg  vm._data.msg
    Object.defineProperty(vm, key, {
        get(){
            return vm[source][key]
        },
        set(newValue){
             vm[source][key] = newValue
        }
    })
}

function initData(vm){
    let data = vm.$options.data
    data = vm._data = typeof  data === 'function' ? data.call(vm) : data || {}
    //  做一层代理
    for(let key in data){
        proxy(vm, '_data', key,)
    }

    // 想当于一个副本，区分于用户传入的data，互不影响
    observe(vm._data)
}

function initComputed(){

}

function initWatch(){
    
}