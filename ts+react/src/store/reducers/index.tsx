import Couter, { CounterState } from './counter'
import Todos, { TodosState } from './todos'

import { connectRouter } from 'connected-react-router'
import history from '@/history'
import { combineReducers } from 'redux'

let reducers = {
    Couter,
    Todos,
    router: connectRouter(history)
}

type ReducersType = typeof reducers

// 合并后的状态类型
type CombinedState = {
    [K in keyof ReducersType]: ReturnType<ReducersType[K]>
}
let combineReducer = combineReducers(reducers)


export { CombinedState, CounterState, TodosState }
export default combineReducer