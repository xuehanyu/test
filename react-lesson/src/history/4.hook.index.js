import React, { useState, useEffect } from 'react'; // 核心库
import ReactDOM from 'react-dom';  // DOM渲染库
/**
 * Hook 使用规则
 * 1、hook就是js函数 只能在函数最外层调用Hook， 不要再循环、条件判断或者子函数中调用
 * 2、只能在react的函数组件中调用Hook，不要在其他js函数中调用
 */

function Example(){
  // useState 第一个Hook， 通过在函数组件里调用它来给组件增加一些内部状态，react在重复渲染时保留这个state。
  // useState 会返回一对值，当前状态和一个让他更新的函数。它类似class组件的this.setState，但是，它不会把新的state和旧的state合并
  // 唯一一个参数就是state的初始状态
  const [ count, setCount ] = useState(0)
  const [ todos, setTodo ]  = useState([{ text: 'learn hook' }])
  const handleAdd = () =>{
    setTodo([
      ...todos,
      { text: '游泳' }
    ])
  }
  // useEffect 也是一个hook， 给函数组件增加操作副作用的能力，它跟class组件的 componentDidMount、coponentDidUpdate、componentWillUnmount
  // 具有相同的用途，只不过被合成了一个API。
  // 可以访问组件的props 和state
  useEffect(()=>{  // 相当于componentDidMount、coponentDidUpdate
    console.log('useEffect')
    document.title = `you clicked ${count} times`
  },[count])   //  仅有当count 发生变化时，才会触发此次effect执行

  return (
  <div>
    <div>{count}</div>
    <button onClick={()=> setCount(count + 1)}>++</button>
    <hr />
    {
      todos.map(item =>{
      return <li key={item.text}>{item.text}</li>
      })
    }
    <button onClick={handleAdd}>添加任务</button>
  </div>
  )

}


ReactDOM.render(
  <Example />,
  document.getElementById('root')
)


