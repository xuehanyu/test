// 入口文件
//  这里应该导出一个类，类上应该又一个install方法
import install from './install'
import createMacher from './create-macher'
import HashHistory from './history/hash'
class VueRouter{
    constructor(options){
        // 用户传入的路由配置
        // console.log(options,'options')  // 默认需要进行数据格式化处理
        // 匹配器 matcher 处理树形结构，格式化route  格式化一个扁平化的数据， 同时提供了两个方法 addRouter， 和匹配路由 match
        this.matcher = createMacher(options.routes || [])   // 1、需要对路由进行格式化！

        // 内部需要使用 hash 、 history 第二步， 进行路由初始化工作
        // TODO history 用于存放历史记录的
        this.history  =  new HashHistory(this)  // base表示的是 基类， 所有实现路由功能公共方法 都放在基类上， 保证不同的路由api 有相同的使用方法啊
        this.beforeEachs = []
    }

    push(location){
        this.history.transitionTo(location, ()=>{
            window.location.hash = location
        })
    }

    match(location){  //  做了个中转，只要路径切换，就调用匹配器进行匹配
        return this.matcher.match(location)
    }

    beforeEach(cb){   // 订阅
        this.beforeEachs.push(cb)
    }

    init(app){  // 初始化方法
        // 这里的app指的是根实例
        
        // 1) 需要获取到路由的路径，进行跳转，匹配到对应的组件进行渲染
        let history = this.history
        const setupHashListener = () => {   // 跳转成功后的回调
            history.setupListener()  // 监听路由变化的方法  父类
        }
        history.transitionTo(  // 跳转的方法  父类
            history.getCurrentLocation(),  // 获取当前的路径   子类
            setupHashListener
        )
        // 2）当第一次匹配完成后，需要监听路由的变化， 之后完成后续的更新


        //订阅，当路径改变 触发更新
        history.listen((route)=>{
            app._route = route
        })
    }
}


VueRouter.install = install

export default VueRouter