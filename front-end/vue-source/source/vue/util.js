// 匹配{{}}的正则表达式
/**
 * ?: 匹配不捕获  不捕获当前的分组
 * + 至少一个
 * ？尽可能少匹配
 */
// 源码中的模版编译 也是基于正则
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g

export const util = {
    getValue(vm, expr) {   //  [obj.name]
        //  先分割，，然后一次取值
        let keys = expr.split('.')
        return keys.reduce((pre, cur) => {
            return pre[cur]
        }, vm)
    },
    compilerText(node, vm) {   //  编译文本节点, 编译文本，替换{{obj.name}}
        //  给节点增加一个自定义属性，为了方便后续的更新操作
        if (!node.expr) {
            node.expr = node.textContent
        }
        // 进行替换
        node.textContent = node.expr.replace(defaultRE, function (...args) {
            return JSON.stringify(util.getValue(vm, args[1]))
        })
    }
}


export function compiler(node, vm) {  // node 就是文档碎片
    //  将所有孩子节点拿到，将类数组转换为数组，，包括元素节点1和文本节点3 nodeType
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
        if (child.nodeType === 1) { // 元素节点
            compiler(child, vm)
        } else if (child.nodeType === 3) { // 文本节点
            util.compilerText(child, vm)
        }
    });
}