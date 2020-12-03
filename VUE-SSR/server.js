const Koa = require('koa')
const Router = require('koa-router')
const ServerRenderer = require('vue-server-renderer')
const path = require('path')
const static = require('koa-static')
const fs = require('fs')
let app = new Koa()
let router = new Router()
let template = fs.readFileSync(path.resolve(__dirname, 'dist/server.html'),'utf8')

// let ServerBundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.bundle.js'), 'utf8')
let ServerBundle = require('./dist/vue-ssr-server-bundle.json')
let clientManifest = require('./dist/vue-ssr-client-manifest.json')

// 表示渲染时 使用自己webpack服务器构建出来的包，并且和他说这里客户端引用的时对应的manifest文件
let renderer = ServerRenderer.createBundleRenderer(ServerBundle, {
    template,
    clientManifest   // 自动引入
})

router.get('/', async ctx=>{
    ctx.body = await new Promise((resolve, reject) => {
        renderer.renderToString((err, data)=>{
            console.log(err, 'errr')
            if(err){
                reject(err)
            } else{
                resolve(data)
            }
        }) 
    })
    .catch(err=>{
        console.log(err)
    })
})



router.get('*', async ctx=>{
    try {
        ctx.body = await new Promise((resolve, reject) => {
            renderer.renderToString({url: ctx.url}, (err, data)=>{
                if(err){
                    reject(err)
                } else{
                    resolve(data)
                }
            }) 
        })
    } catch (error) {
        ctx.body = 'page not found'
        console.log(error) 
    }
})


app.use(static(path.resolve(__dirname, 'dist')))  // 以哪个静态目录去访问
app.use(router.routes())
app.listen(3000)