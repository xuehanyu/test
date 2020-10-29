export function createRoute(record, location){
    let res = []  // 如果匹配到了路径/数据，需要将路径都放进来
    if(record){
        while(record){
            res.unshift(record)
            record = record.parent
        }
    }
    return {
        ...location,
        matched: res
    }

}

class History {
    constructor(router){
        this.router = router
        // 路径切换，需要有对比数据，所以初始化当前路径
        // createRoute 当前记录，匹配对应关系
        this.current = createRoute(null, {
            path: '/'
        })
    }

    transitionTo(location, callback){
        //  需要根据路径获取到对应的组件
        let r = this.router.match(location)
        // 为了保证不会多次触发页面更新
        if(location == this.current.path && r.matched.length == this.current.matched.length) return
        
        
        // 在更改路径之前需要先 执行钩子函数

        //  一次执行，定义的方法
        let queue = this.router.beforeEachs   //  拿到钩子函数的队列
        const iterator = (hook, next)=>{  // 迭代器函数
            hook(r, this.current, next)  // 当执行完异步操作，执行下一步 next === 》 step（）
        }
        runQueue(queue, iterator, ()=>{  // 队列都执行玩的回调，更新路由
            this.updateRoute(r)
        })
        callback && callback()
    }
    updateRoute(r){
        this.current = r
        this.cb && this.cb(r)
    }
    setupListener(){
        window.addEventListener('hashchange', ()=>{
            this.transitionTo(window.location.hash.slice(1))
        })
    }
    listen(cb){
        this.cb = cb
    }
}

function runQueue(queue, iterator, callback){
    function step(index){   // 异步的迭代不能使用for ，需要使用函数，一步步执行
        if(index === queue.length) return callback()   // 都执行完之后，调用路由更新逻辑
        let hook = queue[index]
        iterator(hook, ()=>step(index+1))  // 递归执行自己
    }
    step(0)
}

export default History