<template>
    <div class="box">
        <li v-for="img in imgs" :key="img">
            <img v-lazy="img">
        </li>
    </div>
</template>

<script>
import { imgs } from './img.json'
export default {
    data() {
        return {
            imgs:[]
        }
    },
    mounted() {   // vue的生命周期是同步执行的
        this.imgs = imgs
    },
}
</script>

<style scoped>
    .box{
        height: 500px;
        overflow: scroll;
        width: 200px;
    }
    img{
        width: 150px;
        height: 150px;
    }
</style>