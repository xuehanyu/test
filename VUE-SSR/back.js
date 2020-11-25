// 需要node 的模块规范 
const Koa = require('koa')
const Router = require('koa-router')
const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const app = new Koa()  // 创建一个应用
const VueServerRenderer = require('vue-server-renderer')  // vue的服务端渲染包

const router = new Router() // 产生一个路由系统

//  在服务端写vue
const vm = new Vue({
    data(){
       return {
            name: 'jack',
            age: 10
       }
    },
    template: `
        <div>
            <div>{{name}}</div>
            <div>{{age}}</div>
        </div>
    `
})  

// 读取模版 同步读取 html 模版
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8')
const render = VueServerRenderer.createRenderer({
    template
})  // 创建一个渲染器
router.get('/', async (ctx)=>{  // 当访问/时，请求是get方法，可以执行对应的回调
    // 希望渲染一个vue的实例
    ctx.body = await render.renderToString(vm)    // 默认返回一个promise
})

app.use(router.routes())  // 产生关联，应用这个路由系统

app.listen(3000)

// 每次修改服务器代码，都需要重启服务器，
// npm install nodemon -g  node的一个监视器，每次更改不需要重新启动，热更新
// nodemon back.js