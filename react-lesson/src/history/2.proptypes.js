import React from 'react'; // 核心库
import ReactDOM from 'react-dom';  // DOM渲染库
/**组件
 * 函数式组件，接受一个属性对象，返回一个react元素
 * 类组件，一个类，需要有一个render方法，render方法需要返回一个并且仅能返回一个顶级React元素
 * 
 */

// 函数式
 function Welcome(props){
  return <div>{props.name}</div>
 }
// 类组件
 class Welcome2 extends React.Component{ 
    static defaultProps = { // 默认名称

    }
    static prpoTypes = {   //  类型检测
      // name :
    }
   constructor(props){
     super(props)
     this.props = props
   }
    render(){
      return <h1>{this.props.name}</h1>
    }
 }

/**
 * 组件的渲染，不但可以是dom标签，还可以是用户自定义的组件
 * react
 */
/**
 * 如何渲染函数组件
 * 1）封装函数组件的属性对象， props = { name: 'title' }
 * 2) 把props传递给Welcome 这个函数，返回一个React 元素
 * 3） 将虚拟dom 渲染到真实dom上
 */

 /**
 * 如何渲染类组件
 * 1）封装函数组件的属性对象， props = { name: 'title' }
 * 2) new Welcome2(props) ; 创建这个类的实例，传递props给this.props
 * 3) 调用实例的render方法，得到返回的react元素
 * 4） 将虚拟dom 渲染到真实dom上
 */
// let element = <Welcome name="titles"/>

/**
 * 组件类型检查，需要引入一个prop-types  设置prpoTypes属性
 *  propTypes.string.isRequired
 *  propTypes.oneOf(['male', 'femal'])   // 枚举值，其中一个
 *  propTypes.arrayOf(PropTypes.string)  // 字符串数组
 *  propTypes.shape({  //值是一个对象，x是number，y也是number类型
 *     x: propTypes.number,
 *     y: propTypes.number
 *  })
 * age(props, propName, componentName){  // 自定一个校验器，属性对象 属性名称，组件名称
 * 
 * 
 */
let element2 = <Welcome2 name="welcom2"/>
ReactDOM.render(
  element2,
  document.getElementById('root')
)


