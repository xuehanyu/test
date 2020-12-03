import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore(){
    return new Vuex.Store({
        state: {
            name: 'xuehanyu',
            age: 18
        }, 
        actions:{
            setName({commit}) {
                commit('setName')
            }
        },
        mutations:{
            setName(state){
                Vue.set(state.name, 'jack')
            }
        }
    })
}