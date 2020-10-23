import { pushTarget, popTarget } from "./dep"
import { util } from '../util'
let id = 0
class Watcher {
    /**
     * 
     * @param {*} vm 当前组件的实例 new Vue
     * @param {*} exprOrFn 用户可能传入一个表达式，也可能传入一个函数
     * @param {*} cb 用户传入的回调函数 vm.$watch('msg', cb)
     * @param {*} opts 一些其他参数
     */
    constructor(vm, exprOrFn, cb = () => { }, opts = {}) {
        this.vm = vm
        this.exprOrFn = exprOrFn
        // TODOexprOrFn 有可能是表达式，有可能是函数，将表达式变成一个函数
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn
        } else{
            this.getter = function(){
                return util.getValue(vm, exprOrFn)
            }
        }
        if(opts.user){
            this.user = true
        }
        this.lazy = opts.lazy   //  表明是否是计算属性
        this.dirty = this.lazy   // 用dirty来做脏值检测，做缓存使用
        this.cb = cb
        this.opts = opts
        this.deps = []
        this.depsId = new Set()
        this.id = id++
        this.immediate = opts.immediate
        // 保存老值，创建watcher的时候，先将初表达式对应的值对应的值取出来
        // 计算属性，默认不执行
        this.value = this.dirty ? undefined : this.get()
        if(this.immediate){
            this.cb(this.value)
        }
        
    }

    get() {
        pushTarget(this)  // this 渲染watcher，Dep.target = watcher  msg变化了，需要让这个watcher执行
        // 默认常见watcher，会执行此方法

        // funllName(){...} 
        let value = this.getter.call(this.vm)
        // 方便执行，在清空当前watcher
        popTarget()
        return value
    }

    evaluate(){  //  TODO 调用用get方法
       this.value =  this.get()
       this.dirty = false  // 值求过了，
    }

    run() {
        //  拿到的是新值
        let value = this.get()
        if(this.value !== value){
            this.cb(value, this.value)
        }
    }

    depend(){
        let i = this.deps.length
        console.log(i)
        while(i--){
            this.deps[i].depend()
        }
    }
    //  更新的方法
    update() {  // 如果立即调用get，会导致页面刷新，希望用异步来更新
        //  先存储watcher
        if(this.lazy){  // 如果是计算属性，数据遍需要更新，更新dirty
            this.dirty = true
        } else{
            queueWatcher(this)
        }
        
    }

    addDep(dep) {   // 同一个watcher，不应该重复记录dep  利用id
        if (!this.depsId.has(dep.id)) {
            this.deps.push(dep)
            this.depsId.add(dep.id)
            dep.addSub(this)
        }
    }

}

let queue = []
let has = {}

function flushQueue() {  // 
    // 等待当前这一轮全部更新后，再去让watcher一次执行
    queue.forEach(watcher => watcher.run())
    queue = []
    has = {}
}

function queueWatcher(watcher) {   // 对重复的watcher 进行过滤操作
    let id = watcher.id
    if (has[id] == null) {
        has[id] = true
        queue.push(watcher)  // 相同的watcher只会存储一个
        //  延迟清空队列,有一个回调刷新队列
        nextTick(flushQueue)
        // setTimeout(flushQueue,0)  异步方法会等待所有同步方法执行完毕之后执行
    }
}
let callbacks = [] // 存储callbacks

function flushCallbacks() {
    callbacks.forEach(cb => cb())
}
function nextTick(cb) {  // 目前cb是flushQueue
    callbacks.push(cb)
    //  异步刷新callbacks, 获取一个异步方法         微任务           宏任务
    // 异步是分执行顺序的，会限制性 promise， mutationObserver setImmediate setTimeout
    let timerFunc = () => {
        flushCallbacks()
    }
    if (Promise) {
        return Promise.resolve().then(timerFunc)
    }
    if (MutationObserver) {
        let observe = new MutationObserver(timerFunc)
        let textNode = document.createTextNode(1)
        observe.observe(textNode, { characterData: true })
        textNode.textContent = 2
        return
    }
    if (setImmediate) {
        return setImmediate(timerFunc)
    }
    setTimeout(timerFun, 0)

}
//  用户也可以手动去掉入回调函数，我们需要这个回调在cb之后去执行， 等待页面更新再去获取dom元素
// Vue.nextTick(()=>{

// })

//  渲染时使用它， 计算属性也使用它，，vm.watch也使用它
export default Watcher