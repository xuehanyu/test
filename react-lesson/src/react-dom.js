export function updateComponent(componentInstance){
    // 更新组件
    let element = componentInstance.render()
    let { type, props } = element
    let newDom = createDom(props, type, componentInstance)
    componentInstance.dom.parentNode.replaceChild(newDom,componentInstance.dom)
    componentInstance.dom = newDom

}
function render (element, container, componentInstance){
    // 如果是文本，直接创建文本节点并插入container中
    if(typeof element === 'string' || typeof element === 'number'){
        return container.appendChild(document.createTextNode(element))  
    }
    let props, type;
    props =  element.props;
    type = element.type
    let isReactComponent = type.isReactComponent
    if(isReactComponent){ 
        // componentInstance.isReactComponent = true
        componentInstance =  new type(props)
        element = componentInstance.render(componentInstance)
        props = element.props
        type = element.type
    }else if(typeof type === 'function'){
        element = type(props)  
        props = element.props
        type = element.type
    }
    // 如果element是一个普通的对象，一个普通的元素节点
    let dom = createDom(props, type, componentInstance)
    if(isReactComponent && componentInstance) {
        //将真实dom 挂在当前dom实例的dom属性上
        componentInstance.dom = dom
    }
    container.appendChild(dom)
}
/**
 * 合成事件 
 * 在事件处理函数执行前要把批量更新模式设置为true
 * 这样的话在函数执行过程中就不会直接更新界面和状态了，只会缓存新的状态updateQueue中
 * 等事件处理函数结束后才会进行实际更新
 */
function addEvent(dom, eventType, listener, componentInstance){
    eventType = eventType.toLocaleLowerCase(); // onClick => onclick事件
    let eventStore = dom.eventStore || (dom.eventStore={})
    eventStore[eventType] = { listener, componentInstance }
}

document.addEventListener('click', dispatchEvent, false)

function dispatchEvent(event){  // event是原生DOM事件
    let { type, target } = event
    while(target){  // 模拟冒泡
        let { eventStore } = target
        if(eventStore){
            let { listener, componentInstance } = eventStore['on'+ type]
            if(listener) {
                if(componentInstance) componentInstance.isBatchingUpdate = true
                listener.call(null, event)
                if(componentInstance){
                    componentInstance.isBatchingUpdate = false
                    componentInstance.forceUpdate()
                    componentInstance.callbacks && componentInstance.callbacks.forEach(cb => cb())
                    componentInstance.callbacks.length = 0
                } 
            }
        }
        target = target.parentNode
    }

}

function createDom(props, type, componentInstance){ // 创建真实dom
    let dom = document.createElement(type)
    for(let propName in props){
        if(propName === 'children'){
            if(Array.isArray(props.children)){
                props.children.forEach(child => render(child, dom, componentInstance));
            } else {
                [props.children].forEach(child => render(child, dom, componentInstance));
            }         
           
        } else if(propName === 'className'){
            dom.className = props[propName]
        } else if(propName === 'style'){
            let styles = props[propName]
            for(let atrr in styles){
                dom.style[atrr] = styles[atrr]
            }
        } else if(propName.startsWith('on')){

            addEvent(dom, propName, props[propName], componentInstance)
            // dom[propName.toLocaleLowerCase()] = props[propName]
        }else {
            dom.setAttribute(propName, props[propName])
        }
    }
    return dom
}


export default{
    render
}