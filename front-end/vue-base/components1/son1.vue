<template>
    <div>
        son1
        <!-- 方式一 -->
        <!-- {{money}} <button @click="changeMoney(500)">更改父组件</button> -->
        <!-- 方式二 -->
        <!-- {{money}} <button @click="change">更改父组件</button> -->
        <!-- 方式三 -->
        <!-- {{value}}  <button @click="change1">更改父组件</button> -->
        <!-- 自定义model  -->
        <!-- {{money}}  <button @click="change">更新</button> -->
        <!-- .sync -->
        {{xxx}}  <button @click="$emit('update:xxx', 8000)">更新hahhaha</button>
    </div>
</template>

<script>
export default {
    name:'son1',
    //  子组件不能更改父组件中的数据，因为属性不是响应式的
    //  子组件可以调用父组件中定义的函数，将需要修改的值传递给父组件，典型的单项数据流
    model:{
        prop: 'money',
        event: 'change'
    },
    props:{
        xxx:{},
        value:{
            type: Number,
            default: 100
        },
        money:{
            type: Number,
            default: 100
        },
        'change-money':{
            type: Function,
            default: ()=>{}
        }
    },
    data(){
        return{

        }
    },
    methods: {
        change(){
            this.$emit('change', 2000)
        },
        change1(){
            this.$emit('input', 800)
        }
    },
}
</script>

<style  scoped>

</style>