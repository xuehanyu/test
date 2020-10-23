import Vue from 'vue'
import Vuex from '../vuex'
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)  // 默认会执行当前插件的install方法

function createLogger(store){
  // console.log(store)
  let preState = JSON.stringify(store.state)
  store.subscribe((mutation, newState)=>{
    console.log(preState)
    console.log(mutation)
    console.log(JSON.stringify(newState))
    preState = JSON.stringify(newState)
  })
}

const myPlugin = (store) =>{
  store.subscribe((mutation, state)=>{
    console.log(mutation, state)
  })
}

function resists(store){
  let local = localStorage.getItem('VUE-state')
  if(local){
    let local = localStorage.getItem('VUE-state')
    store.replaceState(JSON.parse(local))
  }
  store.subscribe((mutation, newState)=>{
    localStorage.setItem('VUE-state', JSON.stringify(newState))
  })
}

//  通过vuex的一个store属性 ,创建一个Store的实例
const store = new Vuex.Store({
  plugins:[
    resists
    // createLogger   // 提交的时候有提示，有之前的状态和之后的状态
    // vue-persists 可以实现数据的持久化
  ],
  modules: {
    a:{
      namespaced: true,
      state:{
        age:'a100'
      },
      mutations: { 
        syncChange(){
          // console.log('a-syncChange')
        }
      },
    },
    b:{
      namespaced: true,
      state:{
        age: 'b100'
      },
      mutations: { 
        syncChange(){
          // console.log('b-syncChange')
        }
      },
      modules:{
        c:{
          namespaced: true,
          state:{
            age: 'c100'
          },
          mutations: { 
            syncChange(){
              // console.log('c-syncChange')
            }
          },
        },
        
      }
    }
  },
  state: {  // 单一数据源
    age: 10
  },
  getters:{
    myAge(state){  // 第一个参数一定是状态  基于状态 得到值
      return state.age + 10
    }
  },
  mutations: { //更改状态的唯一方式  通过commit
    syncChange(state, payload){
      state.age += payload
    }
  },
  actions: {
    asyncChange({ commit }, payload){  // 第一个参数是store， 第二个参数是payload
        setTimeout(()=>{
          commit('syncChange', payload)
        },1000)
    }
  }
})

// store.registerModule(['b','d'],{
//   state:{
//     age:'d100'
//   }
// })

export default store