import React from 'react'
import ReactDom from 'react-dom'
import Todos from './components/todos'
import Counter from './components/Counter'
import store from '@/store'

import { Route, Link, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import history from './history'
ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <React.Fragment>
                <ul>
                    <li><Link to="/counter/counterName">conter</Link></li>
                    <li><Link to={{ pathname: "/todos", state: { name: "todosName" } }}>todos</Link></li>
                </ul>
                <Switch>
                    <Route path='/counter/:name' component={Counter}></Route>
                    <Route path='/todos' component={Todos}></Route>
                </Switch>
            </React.Fragment>
        </ConnectedRouter>
    </Provider>, document.getElementById('root'))







