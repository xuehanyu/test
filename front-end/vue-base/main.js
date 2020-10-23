import Vue from 'vue'


//默认是runtime only版本，不能写template，报错 代码跑起来不行了
import App from './App.vue'
//  绑定事件和触发事件 需要在同一个实例上面
Vue.prototype.$bus = new Vue()   // 每个实例上都具备$on $emit $off 方法，，通过创建公用实例，实现订阅发布

new Vue({
    el:'#app',  // 内部自带的html模版
    render(h){
        return h(App)
    }
})

