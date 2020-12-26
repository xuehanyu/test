import { createStore, applyMiddleware } from 'redux'

import combineReducer from './reducers'

import { routerMiddleware } from 'connected-react-router'

import history from '@/history'

// routerMiddleware拦截路由跳转的动作
let store = applyMiddleware(routerMiddleware(history))(createStore)(combineReducer)
export default store