import React, { useContext } from 'react'; // 核心库
import ReactDOM from 'react-dom';  // DOM渲染库
/**
 * Context 提供了一种在组件之间共享此类值的方式，而不必显示的通过组件树的逐层传递props 
 * API:
 * React.createContext()  创建一个context对象
 * Context.provider每个context对象都会返回一个Provider React组件，它允许消费组件订阅context的变化
 * Provider接受一个value属性，传递给消费组件，一个Povider可以和多个消费组件有对应关系
 */
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
}
// 为当前的theme 创建一个context 参数为默认值
const ThemeContext = React.createContext(themes.light)


function ThemeButton(){
  // 如果是类组件，指定contextType 读取当前的theme context
  //  react 会往上找到最近的theme Provide ，然后使用它
  //  static contextType = ThemeContext
 const theme = useContext(ThemeContext)
  return (
    <button style={{ background: theme.background, color: theme.foreground }}> 
      theme button
   </button>
  )
}
// 中间组件，不必指明往下传递的theme了
function ToolBar(props){
  return (
    <div>
      <ThemeButton />
    </div>
  )
}

function App(){
  /**
   * 在使用Provider来将当前的theme传递给以下的组件树
   * 无论多深，任何组件都能读取这个值
   * 在当前例子中，将dark 作为当前值传递下去
   */
  return (
    <ThemeContext.Provider value={themes.dark}>
      <ToolBar />
    </ThemeContext.Provider>

  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


