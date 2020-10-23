<template>
    <div>
        parent {{mny}}
        <!-- 方式一 -->
        <!-- <Son :money="mny" :change-money="changeMoney"></Son> -->
        <!-- 方式二 v-on:click  相当于给Son组件增加 Son.$on('click', changeMoney) 方法  发布订阅 -->
        <!-- click不是原生的事件， .native修饰符 会把事件绑定给当前组件的最外层元素 -->
        <!-- <Son :money="mny" @click="changeMoney"></Son> -->

        <!-- 同步数据 -->
        <!-- 方式三： v-model 是 value 和 @input的语法糖 -->
        <!-- <Son :value="mny" @input="val => mny = val"></Son> -->
        <!-- 语法糖 -->
        <!-- <Son v-model="mny"></Son> -->
        <!-- 如何自定义v-model -->

        <!-- <Son v-model="mny"></Son> -->

        <!-- .sync 语法糖 -->
        <!-- <Son :money="mny" @update:money="val=>mny=val"></Son> -->
        <!-- <Son :xxx.sync="mny"></Son> -->
        <!-- 如果父子组件 想同步数据，可以使用传递属性 + 自定义事件的方式 （语法糖 v-model /.sync） -->

        <Son2 @eat="eat"></Son2>
    </div>
</template>

<script>
// import Son from './son1.vue'
import Son2 from './son2.vue'
export default {
    name:'parent',
    provide(){
        return { parent: this }  //  直接将这个组件暴露出去
    },
    components:{  Son2 },
    data(){
        return {
            mny: 1000
        }
    },
    methods: {  // methods中的函数，已经被bind过，不能在更改
        changeMoney(value){
            this.mny += value
        },
        eat(value){
            console.log('son2中的eat方法', value)
        }
    },
}

//  数据传递关系 父子传递 子父传递 平级通信 跨级通信
</script>

<style  scoped>

</style>