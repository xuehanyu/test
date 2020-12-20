
export { }

interface type1 {
    (name: string): any
    age: number  // 函数的属性
}
let t: any = (name: string) => { }
t.age = 10
let t1: type1 = t