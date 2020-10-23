import { h, render, patch } from '../../source/vue/vdom'

let container = document.getElementById('app')
//  节约性能， 先把真实节点，用一个对象表示出来， 再通过对象渲染到页面上
// 前端操作dom的时候，排序 正序 反序  删除  
//  diff 新的节点 在生成一个对象


//  vue代码基本上不用手操作dom

// 虚拟dom 只是一个对象
//  vue template render函数

// 初始化， 将虚拟节点 渲染到页面上
/* <div id="container"><span style="color:red">hello</span>word</div> */


//虚拟节点必须是个对象，所以针对 'hello' 这样的字符串，我们需要再次转换

// let oldVnode = h('div', { id:'container'}, h('span', { style: { color: 'red' } }, 'hello'), 'word')

let oldVnode = h('div', { id: 'contaienr' },
    h('li', { key: 'A', style: { backgroundColor: 'red' }, }, "A"),
    h('li', { key: 'B', style: { backgroundColor: 'yellow' }, }, "B"),
    h('li', { key: 'C', style: { backgroundColor: 'green' }, }, "C"),
    h('li', { key: 'D', style: { backgroundColor: 'blue' }, }, "D")
)


let newVnode = h('div', { id: 'aaa' },
    h('li', { key: 'E', style: { backgroundColor: 'blue' }, }, "E"),
    h('li', { key: 'A', style: { backgroundColor: 'red' }, }, "A"),
    h('li', { key: 'F', style: { backgroundColor: 'yellow' }, }, "F"),
    h('li', { key: 'C', style: { backgroundColor: 'green' }, }, "C"),
    h('li', { key: 'N', style: { backgroundColor: 'pink' }, }, "N")
)


// 通过render函数将虚拟节点渲染到页面上
render(oldVnode, container)

setTimeout(() => {
    patch(oldVnode, newVnode)  // patchVnode 用心的虚拟绩点和老得虚拟节点做对比，更新真实的dom元素
}, 1000)


// for(let key in app ){
//     console.log(key)
// }

// {
//     tag:'div',
//     props:{},
//     children:[
//         {
//             tag:undefined,
//             props:undefined,
//             children:undefined,
//             text:'hello'
//         }
//     ]
// }

// <div>hello</div>

// new Vue({
//     render(h){
//         return h('div',{}, 'hello')
//     }
// })