import Vue from 'vue'   //  会默认现查找source 目录下的vue文件夹

//  vue源码实现用的是es5 的构造函数 ，而不是用的是es6的类，这样可以方便在原型上扩展方法

let vm = new Vue({
    el: '#app',  //  表示要渲染的元素是app
    data() {
        return {
            msg: "hello vue",
            arr: [[50], 1, 2, 3],
            obj: { name: 'jack', age: 10, address: { a: '111' } },
            firstName: 'xue',
            lastName:'hanyu'
        }
    },
    computed: {
        fullName(){
            return this.firstName + this.lastName
        }
    },
    watch: {
        // msg(newValue, oldValue){
        //     console.log(newValue, oldValue)
        // }

        //  watch 还可以有handler的写法
        // msg:{
        //     handler: function (newValue, oldValue){
        //         console.log(newValue, oldValue)
        //     },
        //     immediate: true
        // }
    }
})

setTimeout(() => {
    // vm.msg = '哈哈哈哈哈哈'
    // vm.msg = '呀呀呀呀呀呀'
    // vm.msg = '啦啦啦啦啦啦'
    // vm.msg = '哇哇哇哇哇哇'   // 批量更新
    // vm.obj.name = '小红1111'

    //  vue的特点就是批量更新，防止重复渲染


    //  --------------数组更新--------
    // vm.arr[0].push(100)  // 页面并没有更新，没有对数组进行依赖收集


    //  --------watch-----

    vm.firstName = '改名了～～～'
}, 1000)

//  希望vm.msg = vm._data.msg  //  代理
// vm.msg = 'this is message'
// console.log(vm.arr[0].a = 100)
//  当向数组中插入push数据时，并没有走set方法，这里的核心是对数组的原生方法进行劫持


//  什么样的数组会被观测 [1，2，3] observe不能直接改变索引不能被监测到

// [1,2,3].length-- 因为数组长度的变化，没有监控

//  [{a:1}]  内部会对数组里边的对象进行监控

// [].push // shift unshift这些方法可以被监控，vm.$set内部调用的就是数组的splice