<template>
    <div>
        t.vue
        {{$attrs}}  
        <button @click="$listeners.click">listeners</button> 
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$listeners)
    },
}
</script>