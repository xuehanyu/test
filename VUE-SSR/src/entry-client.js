/**
 * 客户端entry只需要创建应用程序，并且将其挂在到DOM中
 * 
 */

 import { createApp } from './app.js'

 const { app } = createApp()

 // 这里假定App.vue 模板中根元素具有 id=app
 app.$mount('#app')
//  router.onReady(()=>{

//  })



// 客户端打包的结果是js
// 服务端打包的结果是js文件 -》得到一个字符串
// 字符串返回客户端 是一个html字符串，把客户端的js往上一放，这里就拥有了js的逻辑