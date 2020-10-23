import Vue from 'vue'


//默认是runtime only版本，不能写template，报错 代码跑起来不行了
import App from './App.vue'
console.log(App)

// 自定义向上派发事件，只要组件上绑定过此事件就触发，同事也可以制定到特定组件上触发
Vue.prototype.$dispatch = function(eventName,componetName, value){
    console.log(this.$options.name,'0000')
    let parent = this.$parent
    while(parent){
        if(parent.$options.name === componetName){
            parent.$emit(eventName, value)  // 没有绑定触发，不会有影响
            return
        }
        parent = parent.$parent
    }
}

// 向下通知某个组件，进行触发事件
Vue.prototype.$broadcast = function(eventName,componetName, value){
    console.log(this.$options.name)
    let children = this.$children  // 因为父组件可能存在多个自组件，children 是一个数组，需要循环遍历
    function broad(children){
        for(let i=0; i<children.length; i++){
            let child = children[i]
            if(child.$options.name === componetName){
                child.$emit(eventName, value)
                return
            } else {
                child.$children && broad(child.$children)
            }
        }
    }
    broad(children)  
}
// 在跟实例中渲染跟组件
new Vue({
    el:'#app',  // 内部自带的html模版
    render(h){
        return h(App)
    }
})

// 默认配置都是vue-cli的配置

// .vue结尾的文件在编译的时候 将template变成render函数， v-loader来出来的 =》 .vue  vue-template-compiler实现的


//  组件间通信