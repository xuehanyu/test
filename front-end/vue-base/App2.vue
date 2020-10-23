<template>
    <div>
        <myDailog>
            hello world
            <!-- 插槽中的数据默认使用的是当前组件的父级数据 -->
            <!-- 老版本具名插槽、 作用域插槽slot-scope -->
            <!-- 作用域插槽 希望用当前组件的数据，只能采用作用域插槽将数据传递出来 -->
            <div slot="header">{{msg}}</div>
            <div slot="footer" slot-scope="{a,b}">{{a}}, {{b}}</div>
            <!-- 新版本具名插槽 使用v-slot 必须使用template 简写# -->
            <template #header>{{msg}}</template>
            <template v-slot:footer="{a,b, isShow}">{{a}} {{b}} {{isShow}}</template>
        </myDailog>
    </div>
</template>

<script>
import myDailog from './components/my-dialog'
export default {
    name:'app',
    data(){
        return {
            msg:'hello Vue'
        }
    },
    mounted() {
        this.$bus.$emit('监听事件', 'hello')
    },
    components:{
        myDailog
    },
    methods: {
      
    },
}
</script>

<style scoped>

</style>