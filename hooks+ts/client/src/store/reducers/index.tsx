import { AnyAction, combineReducers, ReducersMapObject, Reducer } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import history from '@/history'
import mine from './mine'
import home from './home'
import profile from './profile'
import { CombinedState } from '@/typings/state'


let reducers: ReducersMapObject<CombinedState, AnyAction> = {
    home,
    mine, 
    profile,
    router: connectRouter(history)
}

const rootReducer: Reducer<CombinedState, AnyAction> = combineReducers<CombinedState>(reducers)



// export type RootState = {
//     // 迭代reducers中的所有的key  reducers[key] 是reducer的类型 ReturnType返回此函数类型的返回值类型
//     [key in keyof typeof reducers] : ReturnType<typeof reducers[key]>
// }

export default rootReducer

// export type ReducersMapObject<S = any, A extends Action = Action> = {
//     [K in keyof S]: Reducer<S[K], A>
//   }