<template>
    <div>
        <!-- <Parent @eat="eat"></Parent> -->
        <!-- <button @click="$broadcast('drink', 'grandson', '饭')">触发grandson中的方法</button> -->
        <Test a="1" b="2" c="3" d="4" @click="click" @mousedown="mousedown"></Test>
    </div>
</template>

<script>
//  使用组件的规则： 1、定义组件 2、引入组件 3、注册组件 4、使用组件


// 双向数据绑定
// import Parent from './components/parent.vue'
import Test from './components/test'
export default {
    name:'app',
    data(){
        return {
            msg:'hello Vue'
        }
    },
    components:{
        Test
    },
    methods: {
         eat(value){
            console.log('parent中eat的方法', value)
        },
         click(){
            console.log('click')
        },
        mousedown(){
            console.log('mousedown')
        }
    },
}
</script>

<style scoped>

</style>