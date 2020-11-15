import React from 'react'; // 核心库
import ReactDOM from 'react-dom';  // DOM渲染库

/**
 * 组件的状态
 * 组件的数据源有两个， 一个是属性，父组件给的，不可更改
 * 另一个是state， 内部初始化的，改变状态的唯一方式是setState
 * 属性和状态都可以影响试图更新，他们的改变都引起试图更新，只有类组件有内部状态
 */

/**
 * 1、不要直接修改state，直接修改不能刷新页面，
 * 2、setState的更新可能会被合并，说明setState里传的对象会跟老得对象进行合并，并不会直接覆盖
 * 3、setState的更新可能是异步的
 * 在事件处理函数里setState的时候，不会直接修改状态，而是先把partialState放入一个数组缓存起来，等待事件执行完了统一更新
 */ 
class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      name: '计数器',
      num: 0
    }
  }
  /**
   * updateQueue = []  更新队列，没调用setState 将其放入缓存数组
   */
  handleClick = () =>{
    // this.setState({  // 包括哦刷新页面的操作， 让真实dom和最新虚拟dom保持一直
    //   num: this.state.num + 1 
    // })
    // console.log(this.state.num)
    // this.setState({  // 包括哦刷新页面的操作， 让真实dom和最新虚拟dom保持一直
    //   num: this.state.num + 1 
    // })
    // console.log(this.state.num)

    this.setState(preState => ({num : preState.num + 1}))
  }

  render(){
    return (
      <div>
        <h1>{this.state.name} : {this.state.num}</h1>
        <button onClick={this.handleClick}>++</button>
      </div>
    )
  }

}
ReactDOM.render(
  <Counter />,
  document.getElementById('root')
)


