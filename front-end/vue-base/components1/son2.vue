<template>
    <div>
        son2
        <GrandSon @drink="drink"></GrandSon>
    </div>
</template>

<script>
import GrandSon from './grandson.vue'
export default {
    name:'son2',
    components:{
        GrandSon
    },
    methods: {
        drink(value){
            console.log('呵呵呵呵呵呵呵', value)
        }
    },
}
</script>

<style  scoped>

</style>