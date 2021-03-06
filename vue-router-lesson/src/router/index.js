import Vue from 'vue'
import VueRouter from '../vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// 使用插件，
// 会给每个组件都增加两个属性 $route 放的所有路由相关的属性， $router 放了一些方法   Vue.prototype
//  还提供了两个组件 router-view 、router-link   Vue.component

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About,
    children:[
      {
        path:'a',
        component:{
          render(){return <h1>this is a</h1> }
        }
      },
      {
        path:'b',
        component:{
          render(h){return h('h1', 'this is b')}
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})


//  vue 路由钩子的实现，，回调函数， express框架的逻辑是一样的
// router.beforeEach((to, from, next)=>{
//   console.log(1)
//   setTimeout(()=>{
//     next()
//   }, 1000)
// })

// router.beforeEach((to, from, next)=>{
//   console.log(2)
//   setTimeout(() => {
//     next()
//   }, 1000);
// })

export default router
