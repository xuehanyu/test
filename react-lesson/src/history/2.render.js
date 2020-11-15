import React from './react'; // 核心库
import ReactDOM from './react-dom.js';  // DOM渲染库


// let element = (
//   <div className='title' style={{color: 'red'}}>
//     hello
//     <span>world</span>
//   </div>
// )
// 1) 渲染元素
// let element = React.createElement('div', { className:'title', id: 'title', style:{ color: 'red'} }, 'hello',
//       React.createElement('span', null, 'world')
//   )
  // 2） 渲染函数组件
function Welcome(props){
  return  React.createElement('div', { className:'title', id: 'title', style:{ color: 'red'} }, 'hello',
  React.createElement('span', null, 'world1111')
)
}
//  createElement，的类型可能是一个函数，不一定是一个字符串，原生DOM是字符串，类组件和函数组件是function
// let element = <Welcome />

// 3）渲染类组件
class Welcome2 extends React.Component{
   render(){
    return React.createElement('div', { className:'title', id: 'title', style:{ color: 'red'} }, 'hello',
      React.createElement('span', null, 'world22222'))
   }

}
let element = React.createElement(Welcome2, {})
ReactDOM.render(
  element,
  document.getElementById('root')
)


