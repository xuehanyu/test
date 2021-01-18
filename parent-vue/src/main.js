import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerApplication, start } from 'single-spa'
Vue.config.productionTip = false


async function loadScript(src){
    return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.src = src;
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })
}

// 缺陷不够灵活，不能动态加载css文件、样式不隔离，没有js沙箱的机制
// 注册应用，name随便起
registerApplication('myVueApp', 
    // 返回一个promise
    async () => {
        await loadScript('http://localhost:10000/js/chunk-vendors.js')
        await loadScript('http://localhost:10000/js/app.js')
        return window.singleVue
    },
    // 激活函数，用户切换到/vue的路径下，需要加载刚才定义的子应用
    location => location.pathname.startsWith('/vue'),
    // 自定义个属性，可以传递到子应用的三个函数，实现通信
    { a: 1 }
)

start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


//  注册子应用，并且挂载一下