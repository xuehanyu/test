
// 创建元素
import { vNode } from './create-element'

export default function h(tag, props, ...children) {
    let key = props.key
    delete props.key
    children = children.map(child => {
        if (typeof child === 'object') {
            return child
        } else {
            return vNode(undefined, undefined, undefined, undefined, child)
        }
    })
    return vNode(tag, props, key, children)
}

