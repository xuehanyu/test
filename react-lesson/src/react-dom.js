function render (element, container){
    // 如果是文本，直接创建文本节点并插入container中
    if(typeof element === 'string' || typeof element === 'number'){
        return container.appendChild(document.createTextNode(element))  
    }
    let props, type;
    props = element.props;
    type = element.type
    let isReactComponent = type.isReactComponent

    if(isReactComponent){ 
        let componentInstance =  new type(props)
        element = componentInstance.render()
        props = element.props
        type = element.type
    }else if(typeof type === 'function'){
        element = type(props)  
        props = element.props
        type = element.type
    }
    let dom = createDom(props, type)
    container.appendChild(dom)
}

function createDom(props, type){
    let dom = document.createElement(type)
    for(let propName in props){
        if(propName === 'children'){
            console.log(props.children)
            props.children.forEach(child => render (child, dom));
        } else if(propName === 'className'){
            dom.className = props[propName]
        } else if(propName === 'style'){
            let styles = props[propName]
            for(let atrr in styles){
                dom.style[atrr] = styles[atrr]
            }
        } else{
            dom.setAttribute(propName, props[propName])
        }
    }
    return dom
}


export default{
    render
}