let Vue 
const forEach = (obj, callBack) =>{
    Object.keys(obj).forEach((key)=>{
        callBack(key, obj[key])
    })
}

const getState = (store, path) =>{
   let newState =  path.reduce((newState, current)=>{
        return  newState[current]
    }, store.state)
    return newState
}

class ModuleCollection{
    constructor(options){
        //  深度遍历将所有的子模块遍历一边
        this.register([], options)
    }
    register(path, rootModule){
        let rawModule = {   //  
            _raw : rootModule,   // 原模块
            _children: {} ,
            state: rootModule.state
        }
        rootModule.rawModule = rawModule
        if(!this.root){
            this.root = rawModule
        }else {
            let parenModule = path.slice(0, -1).reduce((root, current)=>{
                return  root._children[current]
            }, this.root)
            parenModule._children[path[path.length-1]] = rawModule
        }
        if(rootModule.modules){
            forEach(rootModule.modules,(moduleName, module)=>{
                // 将 a模块进行注册，[a] , a模块的额定义
                // 将 b模块进行注册，[b] , b模块的额定义
                // 将 c模块进行注册，[b, c] , c模块的额定义
                this.register(path.concat(moduleName), module)
            })
        }

    }
}

class Store {
    constructor(options){   // 获取用户new 实例传入的所有属性
        //使store中的数据变成响应式的
        this.vm = new Vue({ 
            data:{  // 默认这个状态会被Object.defineProperty重新定义
                state: options.state
            }
        })
        this.getters = {}
        this.actions = {}
        this.mutations = {}
        this.subs = []
       
        // 1、 创建一个类，用于格式化modules
        this.modules = new ModuleCollection(options)
        // console.log(this.modules)

        // 2、递归安装模块 store/ rootState/ path/ 根模块
        installModule(this, this.state, [], this.modules.root)
        let plugins = options.plugins
        if(plugins){
            plugins.forEach(fn=> fn(this))
        }

    }
    get state() {
        return this.vm.state
    }
    subscribe(fn){   // 订阅
        this.subs.push(fn)
    }
    replaceState(newState){
        this.vm.state = newState
    }
    // 动态注册
    registerModule(moduleName, module){
        if(!Array.isArray(moduleName)){
            moduleName = [moduleName]
        }
        this.modules.register(moduleName, module)   // 注册模块
        // store/ rootState/ path/ 根模块
        installModule(this, this.state, moduleName,module.rawModule)
    }

    commit = (mutationName, payload) =>{  // es7的写法，，保证后面调用commit方法时，this指向当前store的实例
        this.mutations[mutationName].forEach(fn => fn(payload))   // 发布
    }

    dispatch = (actionName, payload) => {
        this.actions[actionName].forEach(fn => fn(payload))
    }
}
function installModule(store, rootState, path, rawModule){
    // console.log(store, rootState, path, rawModule,'---')  //  b/c
    let root = store.modules.root  // 最后格式化的结果
    let namespaced = path.reduce((pre, current)=>{
        // 拿到的是当前通过路径或获取到的模块
        root = root._children[current] 
        return  pre +  (root._raw.namespaced ?  current+'/' : '')
    }, '')
    // 目前模块中的state木有挂载到根state上，递归挂载，
    if(path.length>0){ // 当length大于0时，说明是子模块
        let parentState = path.slice(0,-1).reduce((root, cur) => {
            return root[cur]
        }, rootState)
        Vue.set(parentState, [path[path.length-1]], rawModule.state)
        // parentState[path[path.length-1]] = rawModule.state
    }

    let getters = rawModule._raw.getters
    if(getters){
        forEach(getters, (getterName, value)=>{
            Object.defineProperty(store.getters, getterName, {
                get:()=>{
                    return value(getState(store, path))
                }
            })
        })
    }
    let mutations = rawModule._raw.mutations
    if(mutations){
        forEach(mutations, (mutationName, value)=>{
            let arr = store.mutations[namespaced+mutationName] || (store.mutations[namespaced+mutationName] = [])
            arr.push((payload)=>{
                value(getState(store, path), payload) // 此处是mutation真正执行的地方
                store.subs.forEach(fn=> fn({type:namespaced+mutationName,payload},store.state));
            })
        })
    }

    let actions = rawModule._raw.actions
    if(actions){
        forEach(actions, (actionName, value)=>{
            let arr = store.actions[namespaced+actionName] || (store.actions[namespaced+actionName] = [])
            arr.push((payload)=>{
                value(store, payload)
            })
        })
    }
    forEach(rawModule._children, (childrenName, rawModule)=>{
        // store/ rootState/ path/ 根模块
        installModule(store,rootState, path.concat(childrenName), rawModule )
    })
}

const install = (_Vue)=>{
    Vue = _Vue
    //  放到Vue的原型上，不对， 因为默认会给所有的vue实例增加
    // 通过Vue.mixin 的方式 向当前跟实例的所有组件实例注入$store方法
    Vue.mixin({  // 组件的创建过程是先父后子
        beforeCreate() {
            if(this.$options.store){  // 如果配置选项上存在store属性说明当前事根实例 ，根实例上也可以获取$store属性
                this.$store = this.$options.store
            } else{
                this.$store = this.$parent && this.$parent.$store
            }
        },
    })
}

export const mapState = (stateArr) => {
    let obj = {}
    stateArr.forEach(stateName => {
      obj[stateName] = function(){
        return this.$store.state[stateName]
      }
    });
    return obj
  }
export function mapGetters(gettersArr){
    let obj = {}
    gettersArr.forEach(gettersName => {
       
      obj[gettersName] = function(){
        return this.$store.getters[gettersName]
      }
    });
    return obj
}
export function mapMutations(obj){
    let res ={}
    Object.entries(obj).forEach(([key,value])=>{
      res[key] = function(...payload){
        return this.$store.commit(value, ...payload)
      }
    })
    return res
  }
  
  
export function mapActions(obj){
    let res ={}
    Object.entries(obj).forEach(([key,value])=>{
      res[key] = function(...payload){
        return this.$store.dispatch(value, ...payload)
      }
    })
    return res
  }

export default {
    install,
    Store
}









 // ----------------------
        // let getters = options.getters
        // forEach(getters, (getterName, value)=>{
        //     Object.defineProperty(this.getters, getterName, {
        //         get:()=>{
        //             return value(this.state)
        //         }
        //     })
        // })
        

        // let mutations = options.mutations
        // forEach(mutations, (mutationName, value)=>{  // 订阅  发布
        //     this.mutations[mutationName] = (payload) =>{
        //         value(this.state, payload)
        //     }
        // })

       
        // let actions = options.actions
        // forEach(actions, (actionName, value)=>{
        //     this.actions[actionName] = (payload)=>{
        //         value(this, payload)
        //     }
        // })