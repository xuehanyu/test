import { initState } from './observe'
import Watcher from './observe/watcher'
import { util, compiler } from './util'
import { patch, h, render } from './vdom'
function Vue(options) {  //  vue中原始用户传入的数据
    this._init(options)  // 初始化vue，并将用户选项传入
}

Vue.prototype._init = function (options) {
    // vue的初始化，vm.$options表示vue中的参数
    const vm = this
    vm.$options = options

    // MVVm原理 需要讲数据重新初始化
    initState(vm)   // 初始化数据，可以包括data、computed、watch 响应式的入口
    // init...

    //  初始化工作 vue1.0 =>
    if (vm.$options.el) {
        vm.$mount()
    }
}

function query(el) {  // 获取真实dom
    if (typeof el === 'string') {
        return document.querySelector(el)
    }
    return el
}

Vue.prototype._update = function (vnode) {
    //  用户传入的数据去更新视图
    let vm = this
    let el = vm.$el
    let preVnode = vm.preVnode
    if(!preVnode){  //  说明是第一次渲染
        render(vnode, el)
        vm.preVnode = vnode
    } else {
        vm.$el = patch(preVnode, vnode)
    }
    //  利用文档碎片进行替换，不需要每次都操作真是的dom，这样操作内存中的对象，最后一次性替换， 减少页面的渲染
    // let node = document.createDocumentFragment()
    // let firstChild
    // while (firstChild = el.firstChild) {
    //     node.appendChild(firstChild)
    // }

    // // 要循环这个元素,将里面的内容换成数据
    // //  每次拿到第一个元素 就将这个元素放到文档碎片中  appendChild具有移动功能

    // // todo 对文进行替换 进行编译compiler()
    // compiler(node, vm)

    // el.appendChild(node)
   
    // 依赖搜集
}

Vue.prototype._render = function(){
    let vm = this
    let render = vm.$options.render
    return render.call(vm, h)
}

Vue.prototype.$mount = function () { // 渲染页面
    const vm = this
    let el = vm.$options.el   // 获取元素，需要判断  转为dom元素
    el = vm.$el = query(el)   // 获取当前挂载节点， vm.$el 就是要挂载的一个元素

    //  渲染时 通过watcher 来渲染的
    //  渲染watcher 用于渲染的watcher
    // v2.0 组件级别的更新  例子中只有一个跟组件 通过new Vue产生的
    let updataComponent = () => {  // 更新组件，首次是渲染组件， 渲染逻辑
        vm._update(vm._render())
    }
    new Watcher(vm, updataComponent)  // 渲染watcher,  默认调用updateComponent这个方法

    // 我们需要让每个数据 更改了，能够 重新渲染
}

Vue.prototype.$watch = function(expr, handler, opts){
    let vm = this
    new Watcher(vm, expr, handler, {user:true, ...opts})
}

export default Vue


// 1 默认会创建一个渲染watcher， 这个watcher会被默认执行

// 2 pushTarget(this)  Dep.target = watcher
// this.getter()  调用当前属性的get方法，给当前的属性加了个dep dep.addSub(watcher)
//  dep.subs = [watcher]
// popTarget();

// 3 当用户修改了属性的变化后，会调用set方法
// dep.notify dep.subs.forEach(watcher => watcher.update())