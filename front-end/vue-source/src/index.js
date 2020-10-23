import Vue from 'vue'


let vm = new Vue({
    el: '#app',
    data() {
        return {
            msg: 'hello vue'
        }
    },
    render(h) {
        return h('p', { id: 'container' }, this.msg)
    }
})


setTimeout(() => {
    vm.msg = 'hello javascript'
}, 1000)