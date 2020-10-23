<template>
  <form @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
// import Schema from 'async-validator';
export default {
    provide(){
      return {
        elForm: this
      }
    },
    name:'el-form',
    props:{
        model:{
            type:Object,
            default:()=>({})
        },
        rules:{
            type:Object,
            default:()=>[]
        }
    },
    methods: {
        async validate(cb){
            let children = this.$children
            let arr = []
            function val(children){
                children.forEach(child=>{
                    if(child.$options.name ==='el-form-item'){
                        child.prop && arr.push(child.validate())
                    }
                    if(child.$children){
                        val(child.$children)
                    }
                })
            }
            val(children)
            console.log(arr,)
            try {
                await Promise.all(arr)
                cb(true)
            } catch (error) {
                cb(false)
            }
        }
    },
}
</script>