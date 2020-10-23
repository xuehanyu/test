<template>
    <div>
        {{$attrs}}
        <!-- v-bind 把所有属性都传递给儿子组件，等价于{ ... } -->
        <!-- <T v-bind="$attrs" @click="click" @mousedown="mousedown"></T> -->
        <T v-bind="$attrs" v-on="$listeners"></T>
    </div>
</template>

<script>
import T from './t.vue'
// 这个组件知识过度的，他不需要使用这些属性
// 如果在props里用了， $attrs就会减少
export default {
    inheritAttrs: false,
    props:['a', 'b'],
    components:{
       T 
    },
    methods: {
       
    },
}
</script>