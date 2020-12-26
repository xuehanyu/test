import { ADD, MINUS } from '@/action-types'
import { CounterAction } from '@/store/actions/counter'
export interface CounterState {
    count: number
}

const initialState: CounterState = {
    count: 0
}

export default function (state: CounterState = initialState, action: CounterAction): CounterState {
    switch (action.type) {
        case ADD:
            return { count: state.count + 1 }
        case MINUS:
            return { count: state.count - 1 }
        default:
            return state
    }
}

