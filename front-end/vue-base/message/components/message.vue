<template>
    <transition>
        <div v-if="visible">
            hello {{message}}  {{type}}
        </div>
    </transition>
    
</template>

<script>
export default {
    data(){
        return {
            type:'',
            message:'',
            visible:false,
            duration: 3000
        }
    },
    mounted() {
       if(this.duration>0){
           setTimeout(()=>{
               this.$destroy()  // 销毁组件实例
               this.$el.parentNode.removeChild(this.$el)  //销毁dom节点
           }, this.duration)
       } 
    },
}
</script>

<style  scoped>
    .v-enter{
        opacity: 0;
    }
    .v-enter-active{
        transition: 1s linear;
    }

    .v-leave-to{
        opacity: 1;
    }
</style>