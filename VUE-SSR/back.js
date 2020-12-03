// 需要node 的模块规范 
const Koa = require('koa')
const Router = require('koa-router')
const createApp = require('./app')
const fs = require('fs')
const path = require('path')
const app = new Koa()  // 创建一个应用
const VueServerRenderer = require('vue-server-renderer')  // vue的服务端渲染包

const router = new Router() // 产生一个路由系统

//  在服务端写vue
// 1)第一步创建一个vue的实例
// const vm = new Vue({
//     data(){
//        return {
//             name: 'jack',
//             age: 10
//        }
//     },
//     template: `
//         <div>
//             <div>{{name}}</div>
//             <div>{{age}}</div>
//         </div>
//     `
// })  

// 读取模版 同步读取 html 模版
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8')
// 2）创建一个renderer渲染器
const render = VueServerRenderer.createRenderer({
    template   // 提供一个页面模板，
})  // 创建一个渲染器
router.get('/', async (ctx)=>{  // 当访问/时，请求是get方法，可以执行对应的回调
    const app = createApp()
    // 3） 第三步，讲一个vue实例渲染为html
    ctx.body = await render.renderToString(app)    // 默认返回一个promise
})

app.use(router.routes())  // 产生关联，应用这个路由系统

app.listen(3000)

// 每次修改服务器代码，都需要重启服务器，
// npm install nodemon -g  node的一个监视器，每次更改不需要重新启动，热更新
// nodemon back.js