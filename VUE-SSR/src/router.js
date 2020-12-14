import Vue from 'vue'
import Router from 'vue-router'
// import foo from './components/foo.vue'
// import bar from './components/bar.vue'
Vue.use(Router)
const foo = () => import('./components/foo.vue')
const bar = () => import('./components/bar.vue')
export  default function createRouter(){
    return new Router({
        mode: 'history',
        routes:[
            {
                path: '/',
                component:foo
            },
            {
                path: '/bar',
                component: bar
            }
        ]
    })
}