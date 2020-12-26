import { ADD, ADD_TODO } from '@/action-types'
import { TodosAction } from '@/store/actions/todos'
import { Todo } from '@/models'

// 引入路由组件
export interface TodosState {
    list: Array<Todo>
}

const initialState: TodosState = {
    list: []
}

export default function (state: TodosState = initialState, action: TodosAction): TodosState {
    switch (action.type) {
        case ADD_TODO:
            return { list: [...state.list, action.payload] }
        default:
            return state
    }
}

