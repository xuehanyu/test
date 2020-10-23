import { initState } from './observe'

function Vue(options){
    // 做一些初始化的工作
    this._init(options)
}

Vue.prototype._init = function(options){
    let vm = this
    vm.$options = options
    // 观察数据，进行初始化
    initState(vm)
}


export default Vue