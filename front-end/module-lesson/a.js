
// 表示将a导出，会将其放入到一个对象当中
export let a = 1
export let b = 2
export let c = 1

setInterval(() => {
    a++
}, 1000);

//  获取一起导出

export { a, b, c }    //  导出的不是一个对象的简写，导出的是a、b、c 的变量列表

// 默认导出，default ,在一个模块只能默认导出1次
//  直接导出某个变量，，外层引入时候，可以直接获取到
//  相当于在这个空间定一个default变量，并导出
export default { a:1, b:2 }

//  等价于
let obj = { a:1, b:2 }
export {
    obj as default
}


//  作为同一个入口 ,如果有n个则特别麻烦，使用导入立即导出
import { x } from './x'
import { y } from './x'


export { x, y } 


// 导入立即导出
export * from './x';
export { y } from './y'   //  在文件中导出部分内容


console.log(y)   //  没有使用import, 没有声明的作用