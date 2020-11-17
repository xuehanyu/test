import React from './react'; // 核心库
import ReactDOM from './react-dom';  // DOM渲染库

// 1) render 函数第一个参数可以是一个字符串，number
// let element = React.createElement('div', {id: 'title'}, 'hello' )

// function Welcome(){
//     return React.createElement('div', {id: 'title'}, 'hello world' )
// }
// class Welcome extends React.Component{
//     render() {
//         return React.createElement('div', {id: 'title'}, 'hello component' )
//     }
// }

// let element = React.createElement(Welcome, {})


/**
 * 1 、不能直接修改state，不能刷新页面，setState包含了刷新界面的操作，让真实dom和最新的虚拟dom保持一致
 * 2、 setState的更新可能被合并，说明setState里传的的对象会跟老得进行合并，并不会直接覆盖
 *      老得有，新的有，更新，老得没有新的没有则添加， 老得有新的没有则保持原值
 * 3、setState的更新可能是异步的
 * 在事件 处理函数setState的时候并不会直接修改状态，而是先把临时状态partialState放入一个数组缓存起来，等待事件执行结束了统一更新
 * 因为每次调用setState都会修改状态，性能比较低，要走渲染流程，走dom所以性能非常差
 */
class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: '计数器',
      count: 0
    }
  }
  handleAdd = () =>{
    // 此情况，会打印两个0，页面最后渲染结果是1
    // this.setState({count : this.state.count + 1})
    // console.log(this.state.count)  // 0
    // this.setState({count : this.state.count + 1})
    // console.log(this.state.count)  // 1 
    this.setState(preState => ({ count : preState.count + 1 }), ()=>{
      console.log(this.state.count)
    })
    console.log(this.state.count)
    this.setState(preState => ({ count : preState.count + 1 }), ()=>{
      console.log(this.state.count)
    })
    console.log(this.state.count)
  }
  render(){
    return (
      <div>
        <div>{this.state.name}</div>
        
        <div>{this.state.count}</div>
        <button onClick={this.handleAdd}>++</button>
      </div>
    )
  }
}

// let element = React.createElement(Counter, {})

ReactDOM.render(
   <Counter />,
    document.getElementById('root')
  )