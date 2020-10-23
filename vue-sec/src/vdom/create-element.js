// 创建虚拟节点

export function vNode(tag, props, key, children, text) {
    return {
        tag,
        props,
        key,
        children,
        text
    }
}