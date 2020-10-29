export default {
    functional: true,  // 函数式组件， 没有状态，没有this
     
    render(h, {parent, data}) {
        let route = parent.$route
        let depth = 0  // 默认先渲染第一个
        // $vnode 表示占位符 vnode，  vnode表示渲染vnode
        while(parent){
            if(parent.$vnode && parent.$vnode.data.routerView){
                depth ++
            }
            parent = parent.$parent
        }
        data.routerView = true
        let record = route.matched[depth]
        if(!record) return h()
        return h(record.component, data)
    },
}