let Vue 
import RouterView from '../vue-router/components/router-view'
import RouterLink from '../vue-router/components/router-link'
export default function install (_Vue){
    Vue = _Vue
    //  默认希望router可以放到任何组件使用
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router){  // 说明当前是根实例
                // 保存根实例
                this._routerRoot = this
                this._router = this.$options.router
                // 初始化路由
                this._router.init(this)  // 这里的this是指的根实例的this

                // 当切换路径之后，试图并没有更新，由于当前current属性并不是响应式的，需要响应式, 当route改变了，试图就会触发更新
                // 将current属性定义成响应式的， 这样稍后更新current， 就可以刷新试图
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                //  子组件都有一个_routerRoot属性可以获取最顶层的根实例
                this._routerRoot = this.$parent &&  this.$parent._routerRoot
                // 如果组件想获取到 根实例中传入到router
                // this._routerRoot._router
            }
        },
    })
    //  实现一个代理的功能
    Object.defineProperty(Vue.prototype,'$route', {  //  都是一些匹配到的属性 path mached
        get(){
            return this._routerRoot._route
        }
    } )

    Object.defineProperty(Vue.prototype, '$router', {   // 访问router实例
        get(){
            return this._routerRoot._router
        }
    })
    Vue.component('RouterView', RouterView)
    Vue.component('RouterLink', RouterLink)
}