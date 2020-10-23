import Vue from 'vue'
import VueLazyload from './vue-lazyload'
import loading from './timg.gif'
import App from './App.vue'


//  use方法是一个全局的api，使用插件,会调用install方法
Vue.use(VueLazyload, {
    preLoad: 1.3,  // 预先加载可见区域的1.3倍
    loading // loading图片
})
// use默认调用执行install方法，默认两个参数

new Vue({
    el:'#app',
    render(h){
        return h(App)
    }
})