<template>
    <div>
       <foo/>  
       <bar/>  
    </div>
</template>
<script>
import foo from './components/foo.vue'
import bar from './components/bar.vue'
export default {
    components:{
        foo,
        bar
    }
}
</script>