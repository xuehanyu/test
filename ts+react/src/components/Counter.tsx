import * as React from 'react'
import { add, minus, go } from '@/store/actions/counter'
import { connect } from 'react-redux'
import { CombinedState, CounterState } from '@/store/reducers'
import { RouteComponentProps } from 'react-router-dom'   // 路由组件的属性
import { StaticContext } from 'react-router'
import { TodosLocationState } from './todos'
import { LocationDescriptorObject } from 'history'

const actions = { add, minus, go }
interface Params {
    name: string
}
type Props = CounterState & typeof actions & RouteComponentProps<Params, StaticContext>

class Counter extends React.Component<Props>{
    render() {
        const path: LocationDescriptorObject<TodosLocationState> = {
            pathname: "/todos", state: { name: "todosName" }
        };
        const { count, add, minus, children, match: { params }, go } = this.props
        return (
            <div>
                <p>{params.name}</p>
                <p>{count}</p>
                <button onClick={add}>+</button>
                <button onClick={minus}>-</button>
                <button onClick={() => go(path)}> /todos</button>
            </div >
        )
    }
}

const mapStateToProps = (state: CombinedState): CounterState => state.Couter
export default connect(
    mapStateToProps,
    actions
)(Counter)