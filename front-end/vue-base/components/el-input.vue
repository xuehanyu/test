<template>
    <input type="text" :value="value" @input="handleInput">
</template>

<script>

export default {
    name:'el-input',
    data(){
        return {
            errMessage:''
        }
    },
    props:{
        value:{}
    },
    methods: {
        handleInput(e){
            this.$emit('input', e.target.value)
            let parent = this.$parent
            while(parent){
                if(parent.$options.name === 'el-form-item'){
                    break
                }
                parent = parent.$parent
            }
            if(parent){
                parent.$emit('validate')
            }
        }
    },
}
</script>