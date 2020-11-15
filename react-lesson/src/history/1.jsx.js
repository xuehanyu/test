import React from 'react'; // 核心库
import ReactDOM from 'react-dom';  // DOM渲染库


// jsx  -- js语法的扩展，具有js的全部功能，能很好的描述ui应该呈现出它应有的交互本质
// 元素  -- react应用的最小单位，它描述了你在屏幕上看到的内容
//  react元素的本质是一个普通的JS对象。不可变对象，每次创建一个新的元素，重新渲染
//  react 只会更新必要的部分，如果新老一致 不做任何操作
// ReactDom 会保证浏览器中的DOM和你的React元素一致
/**
 * 
 * 在webpack 打包的时候，会把jsx转换存的js代码
 */

//  <h1>hello world</h1>   ---->
//  React.createElement('h1', {   // 1）第一个参数是类型，2）将属性转换一个对象 3）子节点一次传入
//     id: "he",
//     class: "hello"
// }, 'hello world')

let name = 'react'

// let element = createElement('h1', { className: 'hello', id:'title' }, 'hello', createElement('span', null, 'world'))
// let element = React.createElement('h1', { className: 'hello', id:'title' }, 'hello', React.createElement('span', null, 'world'))

// < 开头的就是jsx元素，，{} 就说是表达式  避免使用js关键字 class  for- htmlFor  要改名
let element = <h1 className='hello' id="title">hello {name}</h1>
// console.log(element,'element')
ReactDOM.render(
  element,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
