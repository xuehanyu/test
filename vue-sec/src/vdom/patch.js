// 这个文件除了第一次的初始化渲染之外 还做对比操作

export function render(vnode, container){
    // 根据虚拟节点创建真实的节点
    let el = createElm(vnode)
    // 涉及到递归创建的饿过程
    container.appendChild(el)
}

//  渲染页面的第一步： 递归创建元素节点
function createElm(vnode){
    let {tag, props, key, children,text} = vnode
    // 首先 判断tag是否是一个string 如果是，创建对应的节点，如果不是说明是文本
    if(typeof tag === 'string'){ //元素节点
        //  将真实dom映射到虚拟dom的一个属性上，
        vnode.el = document.createElement(tag)
        updateProperties(vnode)
        children.forEach(child => {
            render(child, vnode.el)
        });
    }else{ // 文本节点
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}

// 第二步： 更新属性
function updateProperties(vnode, oldProps={}){
    let newProps = vnode.props  // 将虚拟的节点上的属性取出
    let el = vnode.el  //  将真实节点取出来，并将属性挂在元素上

    //  更新操作会用到，对比新老节点，如果老属性中的属性，在新属性中没有，需要删除
    let oldStyle = oldProps.style
    let newStyle = newProps.style

    for(let key in oldStyle){
        if(!newStyle[key]){
            newStyle[key] = ''
        }
    }

    for(let key in oldProps){
        if(!newProps[key]){
            delete newProps[key]
        }
    }

    for(let key in newProps){
        if(key === 'style'){
            for(let styleName in newProps[key]){
                el.style[styleName] = newProps[key][styleName]
            }
        }else if(key==='class'){
            el.className = newProps[key]
        } else{
            el[key] = newProps[key]
        }
    }
}