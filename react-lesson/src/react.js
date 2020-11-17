import { updateComponent }  from './react-dom.js'
class Component{
    static isReactComponent = true
    constructor(props){
      this.props = props
      this.updataQueue = []  // 这是放着临时队列
      this.isBatchingUpdate = false // 表示当前是否处于批量更新模式
      this.callbacks = []
    }

    setState(partialState, callback){
      this.callbacks.push(callback)
      this.updataQueue.push(partialState)
      if(!this.isBatchingUpdate){  // 如果当前不处于批量更新，则直接更新
        this.forceUpdate()
      }
    }

    forceUpdate(){
      //  state做了一个合并
      this.state = this.updataQueue.reduce((pre, cur) => {
        return typeof cur === 'function' ? { ...pre, ...cur(pre)} : {...pre, ...cur}
      }, this.state)
      // 清除队列
      this.updataQueue.length = 0
      updateComponent(this)
    }
}

function createElement(type, props = {}, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    }
  }
};


export default {
  createElement,
  Component
}

