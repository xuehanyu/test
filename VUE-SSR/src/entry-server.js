/**
 * 服务器entry 使用default export导出函数，并在每次渲染中重复调用此函数 
 */

import { createApp } from './app.js'
// 服务端回调用函数，传递参数
export default context => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个promise
    // 以便服务器能够等待所有内容在渲染前，就准备就绪
    // let { app, router } = createApp()
    // router.push(context.url)  // 渲染时，先让路由跳转到当前客户请求的路径
    // return app  // 已经渲染完成了， 把当前路径对应的内容渲染好了 
    // 等到router 将可能的异步组件和钩子解析完
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()
        router.push(context.url) 
        router.onReady(()=>{
            const matchedComponents = router.getMatchedComponents()
            if(!matchedComponents.length){
                return reject({code: 404})
            }
            // promise 应该resolve 应用程序实例，以便它可以渲染
            resolve(app)
        }, reject)
    }).catch((err)=>{
        console.log(err)
    })
}