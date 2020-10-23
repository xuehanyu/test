import Vue from 'vue'
import messageComponent from './message.vue'
// 手动挂载,获取该组件对象的构造函数 通过vue.extend（）

const messageConstructor = Vue.extend(messageComponent)

const Message = (options)=>{
    let instance = new messageConstructor({
        data: options
    })
    instance.$mount()  // 表示挂载组件，挂载之后的结果会放在实例的$el属性上
    document.body.appendChild(instance.$el)   //  手动进行渲染
    instance.visible = true
}


['success','error','warnning'].forEach(type=>{
    Message[type] = function(options){
        options.type = type
        // 不管以什么方式调用，最后统一通过Message()调用
        return Message(options)
    }
})

export { Message }