import Vue from 'vue'

let vm = new Vue({
    el:'#app',
    data(){
        return {
            msg:'hello word',
            obj:{name:'jack', age:18},
            arr:[[6,7,8],1,2,3]
        }
    },
    computed(){

    },
    watch(){

    }
})

vm.arr[0].push(10000)