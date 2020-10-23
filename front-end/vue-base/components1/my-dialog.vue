<template>
    <div>
        <div>
            <slot name="header"></slot>
        </div>
        
        这是一个弹窗
        <div>
            <slot name="footer" a="a" b="b" :isShow="isShow"></slot>
        </div>
        
    </div>
</template>

<script>

export default {
    data(){
        return {
            isShow:true
        }
    },
    mounted() {
        this.$bus.$on('监听事件', function(arg){
            console.log(arg,'arg')
        })
    },
}
</script>