import React from 'react'
import ReactDom from 'react-dom'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import Home from './routes/Home'  // router 路由组件，一个组件表示一个页面
import Mine from './routes/Mine'
import Profile from './routes/Profile'
import { ConnectedRouter } from 'connected-react-router'
import history from '@/history'
ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConfigProvider locale={zh_CN}>
                <main className='main-container'>
                    <Switch>
                        <Route path='/' exact component={Home}></Route>
                        <Route path='/mine' exact component={Mine}></Route>
                        <Route path='/profile' exact component={Profile}></Route>
                    </Switch>
                </main>
            </ConfigProvider>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'))