import { ADD, MINUS } from '@/action-types'

import { TodosLocationState } from '@/components/todos'
import { LocationDescriptorObject } from 'history'
import { push, CallHistoryMethodAction } from 'connected-react-router'
export function add() {
    return { type: ADD }
}


export function minus() {
    return { type: MINUS }
}

export function go(location: LocationDescriptorObject<TodosLocationState>): CallHistoryMethodAction<[LocationDescriptorObject<TodosLocationState>]> {
    return push(location)
}

export type CounterAction = ReturnType<typeof add> | ReturnType<typeof minus>