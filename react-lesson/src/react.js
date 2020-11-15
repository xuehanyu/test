class Component{
    static isReactComponent = true
    constructor(props){
      this.props = props
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

