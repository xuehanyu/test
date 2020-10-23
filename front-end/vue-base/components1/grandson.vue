<template>
    <div>
        grandSon
        {{parent.mny}}
        <button @click="$dispatch('eat', 'parent', '饭')">触发方法</button>
    </div>
</template>

<script>
export default {
    name: 'grandson',
    inject:['parent']
}
</script>

<style  scoped>

</style>