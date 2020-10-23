// 这个文件除了第一次的初始化渲染之外 还做对比操作

export function render(vnode, container){
    // 根据虚拟节点创建真实的节点
    let el = createElm(vnode)
    // 涉及到递归创建的饿过程
    container.appendChild(el)
    return el
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
    let newProps = vnode.props || {}  // 将虚拟的节点上的属性取出
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


export function patch(oldVnode, newVnode){
    //  对比新老节点，更新页面元素
    //  1、 首先判断两个节点的标签是否一致，如果不一致直接用老得节点替换新的
    if(oldVnode.tag !== newVnode.tag){
        oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el)
    }

    // 2、比较文本，标签不一样，可能都是undefined·  有可能是文本节点，则直接替换文本
    if(!oldVnode.tag && oldVnode.text !== newVnode.text){
        oldVnode.el.textContent = newVnode.text
    }

    // 3、标签一样，可能属性不一样，标签一样 复用即可，，这个时候可以更新属性
    let el = newVnode.el = oldVnode.el
    updateProperties(newVnode, oldVnode.props)

    //  比较孩子
    let newChildren = newVnode.children || []
    let oldChildren = oldVnode.children || []
    // 1、老的还有孩子，新的有孩子 updateChildren
    if(newChildren.length>0 && oldChildren.length>0){
        updateChildren(el, oldChildren, newChildren)
    } else if(oldChildren.length>0){// 2、老的还有孩子，新的没孩子
        el.innerHTML = ''
    } else if(newChildren.length>0){ // 3、老的没有孩子，新的有孩子
        for(let i=0 ; i< newChildren.length; i++){
            let child = newChildren[i]
            el.appendChild(createElm(child))
        }
    }
    return el
}

// 判断两个节点是否相同 如果标签相同 key相同，可以认为是同一个节点
function isSameNode(oldStartVnode, newStartVnode){
   return  (oldStartVnode.tag === newStartVnode.tag) && (oldStartVnode.key === newStartVnode.key)
}

function updateChildren(parent, oldChildren, newChildren){
    // vue增加了很多优化策略，因为在浏览器中操作dom最常见的方法是，开头或者结尾插入
    //  涉及到正序和倒序
    // 双指针，一个一个比较
    let oldStartIndex = 0
    let oldStartVnode = oldChildren[0]
    let oldEndIndex = oldChildren.length - 1
    let oldEndNode = oldChildren[oldEndIndex]

    let newStartIndex = 0
    let newStartVnode = newChildren[newStartIndex]
    let newEndIndex = newChildren.length - 1
    let newEndNode = newChildren[newEndIndex]
    // TODO： 将老节点做一个一key 为key， index 为value的映射表，方便新节点查找在老节点中存不存在，并且找到moveIndex
    // makeIndexByKey
    let map = {}
    function makeIndexByKey(children){
        for(let i=0; i<children.length; i++){
            let child = children[i]
            map[child.key] = i
        }
        return map
    }
    makeIndexByKey(oldChildren)
    while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex ){
        if(!oldStartVnode){
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if(!oldEndNode){
            oldEndNode = oldChildren[--oldEndIndex]
        }else if(isSameNode(oldStartVnode, newStartVnode)){  // 从前面比较
            patch(oldStartVnode, newStartVnode)
            newStartVnode = newChildren[++newStartIndex]
            oldStartVnode = oldChildren[++oldStartIndex]
        }else if(isSameNode(oldEndNode, newEndNode)){   // 从后面比较
            patch(oldEndNode, newEndNode)
            oldEndNode = oldChildren[--oldEndIndex]
            newEndNode = newChildren[--newEndIndex]

        }else if(isSameNode(oldStartVnode, newEndNode)){  // 头和尾相同的情况
            patch(oldStartVnode, newEndNode)
            parent.insertBefore(oldStartVnode.el ,oldEndNode.el.nextSibling)
            oldStartVnode = oldChildren[++oldStartIndex]
            newEndNode = newChildren[--newEndIndex]
        } else if(isSameNode(oldEndNode, newStartVnode)){   // 尾部和头部相同的情况
            patch(oldEndNode, newStartVnode)   
            parent.insertBefore(oldEndNode.el, oldStartVnode.el)
            oldEndNode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else {    // 两个列表乱序，不复用，但其中也有相似之处  a, b, c, d   ===>     e, a, f, c, n
            //  查找规则： 1、会先拿新节点的第一项 去老节点中匹配，如果匹配不到直接将这个节点出入到老节点开头的前面，如果能查找则直接移动老节点，， 循环时，没有值，需要前移
            //  2、可能老节点中还有剩余，则直接删除老节点中剩余的属性
            newStartVnode = newChildren[newStartIndex]
            let moveIndex = map[newStartVnode.key]
            if(!moveIndex){
                parent.insertBefore(createElm(newStartVnode), oldChildren[oldStartIndex].el)
            } else{
                let moveVnode = oldChildren[moveIndex]
                oldChildren[moveIndex] = undefined 

                parent.insertBefore(moveVnode.el, oldChildren[oldStartIndex].el)
                patch(moveVnode, newStartVnode)

            }
            newStartVnode = newChildren[++newStartIndex]
        }
    }  
    if(newStartIndex <= newEndIndex){
        for(let i=newStartIndex; i<= newEndIndex; i++){
            // 可能是往前面插入，也可能是往后边插入  insertBefore

            let ele = newChildren[newEndIndex+1] == null ? null : newChildren[newEndIndex + 1].el
            // parent.appendChild(createElm(newChildren[i]))
            parent.insertBefore(createElm(newChildren[i]), ele)
            // insertBefore(插入的元素，null) =  appendChild
        }
    }
    if(oldStartIndex <= oldEndIndex){
        for(let i=oldStartIndex; i<=oldEndIndex; i++){
            let child = oldChildren[i]
            if(child != undefined){
                parent.removeChild(child.el)
            }
        }
    }
}