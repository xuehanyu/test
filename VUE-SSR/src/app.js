// 服务端渲染需要一个实例
// 假如只有一个vm实例，每一个客户端访问，都要有一个全新的实例
// 将new vue这个代码包装成一个函数， 每次服务端渲染的时候，都通过哈桉树返回实例来渲染


/**
 * 应用程序的通过entry，在此文件中创建根vue实例，并直接挂在到DOM，对于服务器渲染ssr
 * 责任转移到存客户端entry文件，app.js简单地使用export导出一个createApp函数
 */

 import Vue from 'vue'
 import App from './App.vue'
 import createRouter from './router.js'

export function createApp(){  // 通用入口， 服务端和客户端都用
    // 创建router的实例
    const router = createRouter()
    const app = new Vue({
        // 注入router 到Vue根实例
        router,
        // 根实例简单的渲染应用程序组件
        render:h => h(App)
    })
    return { app, router}
}