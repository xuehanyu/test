import React from 'react'
import { Todo } from '@/models'
import { WithDefaultProps, DefaultProps } from '@/util'
// 默认属性
// let defaultProps = {
//     setting: {
//         maxLength: 6,
//         placeholder: '请输入代办事项'
//     }
// }
interface OwnProps {
    addTodo: (todo: Todo) => void
}

// export type DefaultProps = Partial<typeof defaultProps>

/// 用户传过来的属性， 联合默认属性 Props 
type Props = OwnProps & DefaultProps

interface State {
    text: string
}
let id = 0

class TodoInput extends React.Component<Props, State> {
    // static defaultProps: DefaultProps = defaultProps
    constructor(props: Props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ text: event.target.value })
    }
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let text = this.state.text.trim()
        if (!text) return
        this.props.addTodo({ id: id++, text })
        this.setState({ text: '' })
    }
    public render() {
        const { setting } = this.props
        return (
            <form onSubmit={this.handleSubmit}>
                <input maxLength={setting.maxLength} placeholder={setting.placeholder} value={this.state.text} onChange={this.handleChange} />
                <button type="submit">添加</button>
            </form>
        )
    }
}

export default WithDefaultProps(TodoInput)