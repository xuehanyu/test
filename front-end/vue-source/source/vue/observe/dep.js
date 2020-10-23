//  Dep 类主要作用是发布订阅模式，，收集watcher
let id = 0
class Dep {
    constructor() {
        this.id = id++   // 唯一标示
        this.subs = []
    }
    addSub(watcher) {   //  用于订阅的方法，将调用addSub时传入的内容保存到subs中
        this.subs.push(watcher)
    }

    notify() {  // 用于发布的方法
        this.subs.forEach(watcher => watcher.update())
    }

    depend() {
        // 为了防止直接调用depend方法，先判断 Dep.target
        // addDep()   希望在watcher中记忆dep
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }
}

let stack = []  //用于保存watcher
// 用于保存当前的watcher
export function pushTarget(watcher) { // 将当前watcher保存在类上
    Dep.target = watcher
    stack.push(watcher)
}

export function popTarget() {  //移除当前的watcher
    stack.pop()
    Dep.target = stack[stack.length - 1]
}


export default Dep