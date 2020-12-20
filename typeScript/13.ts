export { }

// proxy 代理
type Proxy<T> = {
    get(): T
    set(value: T): void
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}
function proxify<T>(obj: T): Proxify<T> {
    let result = <Proxify<T>>{}
    for (const key in obj) {
        Object.defineProperty(result, key, {
            get() {
                console.log('get', key)
                return obj[key]
            },
            set(value) {
                console.log(value)
                obj[key] = value
            }
        })
    }
    return result
}

interface Props {
    name: string,
    age: number
}
let props: Props = {
    name: 'jack',
    age: 10
}

let proxyProps: any = proxify<Props>(props)

