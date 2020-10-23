import Lazy from './lazy.js'
export default {
    install(Vue, options){
        // _Vue = Vue 为了保证和当前Vue的构造函数是一个
        // 两个参数，Vue的构造函数，希望写Vue的插件时不去依赖Vue， options用户传入的参数
        // 可以做几件事情，1）注册全局组件、2）注册全局过滤器及指令 3）给Vue的原型扩展属性

        const LazyClass = Lazy(Vue) // 利用函数柯里化，提前保存Vue，保证插件打包后的vue版本和开发时候的版本一致
        const lazy = new LazyClass(options)
    
        Vue.directive('lazy',{
            // 保证add方法执行的时候this指向指定lazy实例
            bind: lazy.add.bind(lazy) // 页面加载绑定的时候走该bind方法
        })

    }
}