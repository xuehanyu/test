import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
let defaultProps = {
    setting: {
        maxLength: 6,
        placeholder: '请输入代办事项'
    }
}

export type DefaultProps = typeof defaultProps


export const WithDefaultProps = <P extends DefaultProps>(OldComponent: React.ComponentType<P>) => {
    type OwnProps = Omit<P, keyof DefaultProps>
    class NewComponent extends React.Component<OwnProps> {
        render() {
            let props = { ...this.props, ...defaultProps } as P
            return <OldComponent {...props} />
        }
    }
    // 将old的静态属性拿到新的组件上
    return hoistNonReactStatics(NewComponent, OldComponent)
}
