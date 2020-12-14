/**
 * 客户端entry只需要创建应用程序，并且将其挂在到DOM中
 * 
 */

 import { createApp } from './app.js'

 const { app,router } = createApp()

 // 这里假定App.vue 模板中根元素具有 id=app

 // 需要在挂载 app 之前调用 router.onReady，因为路由器必须要提前解析路由配置中的异步组件
 // ，才能正确地调用组件中可能存在的路由钩子
 router.onReady(()=>{
    app.$mount('#app')
 })



// 客户端打包的结果是js
// 服务端打包的结果是js文件 -》得到一个字符串
// 字符串返回客户端 是一个html字符串，把客户端的js往上一放，这里就拥有了js的逻辑