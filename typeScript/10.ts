//  数字 + any = any
export { }
function addOne(a: any) {
    return a + 1
}

function sum(a: number, b: number) {
    return a + addOne(b)
}
let result = sum(1, 3)

//  交叉类型 &
interface Bird {
    name: string,
    fly(): void
}

interface Person {
    talk(): void
}

type BirdPerson = Bird & Person

let p: BirdPerson = {
    name: 'jack',
    fly() { },
    talk() { }
}

type X = {
    a: string,
    b: number
}

type Y = {
    a: number,
    c: number
}

type XY = X & Y



type T1 = string | number  // 联合类型
type T2 = number | boolean

type T3 = T1 & T2

let t: T3 = 1


// mixin 混合
interface AnyObject {
    [prop: string]: any
}

function mixin<T, U>(one: T, two: U) {
    let result = <(T & U)>{}
    for (let key in one)
        (<T>result)[key] = one[key]
    for (let key in two)
        (<U>result)[key] = two[key]
    return result
}

const x = mixin({ name: 'jack' }, { age: 10 })

console.log(x.name, x.age)


// typeof  获取一个变量的类型
// 一般先定义类型，在定义变量
type Person3 = {
    name: string
}

let p3: Person3 = {
    name: 'oo9o'
}

let p4 = {
    name: '---',
    age: 10
}

type Person4 = typeof p4


//  索引访问操作符

interface Person5 {
    name: string,
    age: 18,
    job: {
        name: string
    }
}

let jobName: Person5['job'] = {
    name: '111'
}

// 映射类型
interface Person8 {
    name: string,
    age: 18,
    gender: 'male' | 'female'
}
// 批量把一个接口中的属性都变成可选的
// type PartialPerson = {
//     [key in keyof Person8]?: Person8[key]
// }

type Partial<T> = {   // Partial的源码
    [key in keyof T]?: T[key]
}
type Person9 = Partial<Person8>




