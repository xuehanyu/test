export { }
// 交叉类型
interface A {
    name: string,
    c: number
}
interface B {
    age: number,
    c: number
}

type C = A & B
let c: C = { name: 'str', age: 10, c: 8 }
