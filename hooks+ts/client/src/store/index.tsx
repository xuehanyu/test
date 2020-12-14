import { createStore, applyMiddleware } from 'redux'
// 这三个都是中间件，promise可以让我们派发promise ，thunk可以让我们派发函数
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise'

import { routerMiddleware } from 'connected-react-router'

import history from '@/history'
import rootReducer from './reducers'
let store = applyMiddleware(routerMiddleware(history), promise, thunk, logger)(createStore)(rootReducer)

export default store