<template>
    <div>
        <button @click="show">点击出现弹层</button>
    </div>
</template>

<script>
import { Message } from './components/message.js'
export default {
    methods: {
        show(){
            // 两种使用方式
            // Message({type:'success', message:'这是一个弹层'})
            Message.success({message:'这是一个成功的弹层'})
        }
    },
}
</script>

<style>

</style>