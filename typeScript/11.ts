/**
 * 条件类型
 */
export { }
interface Fish {
    name1: string
}

interface Water {
    name2: string
}

interface Bird {
    name3: string
}

interface Sky {
    name4: string
}

// type Condition<T> = T extends Fish ? Water : Sky  // 当像T这样裸类型时会条件分发
let con: Condition<Fish> = { name2: '水' }

type Condition<T> = { t: T } extends { t: Fish } ? Water : Sky  // 当像T这样裸类型时会条件分发

// 条件类型的分发
let con1: Condition<Fish | Bird> = {
    name4: 'o',
}
let con2: Condition<Fish | Bird> = {
    name4: 'o'
}


// 找出T中不包含U的部分
type Diff<T, U> = T extends U ? never : T
type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>
type R2 = never | never | never | 'd'


type Filter<T, U> = T extends U ? T : never
type R3 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>  //  'a'| 'b'| 'c'


// 内置条件类型
// Exclude  从T中排除U
type Exclude<T, U> = T extends U ? never : T
type R4 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>   // d    同diff

//  Extract 提取
type Extract<T, U> = T extends U ? T : never
type R5 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>   // 同filter

// NonNullable 非空  将数据中的null 和 undefined排除掉
type NonNullable<T> = T extends undefined | null ? never : T
type R6 = NonNullable<'a' | undefined | null>  // a


// ReturnType  获取函数类型的返回类型
// infer 推断，可以区类型的某一个部分
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

function getUser(a: string, b: number) {
    return {
        name: 'jack',
        age: 10
    }
}

type GetUserType = typeof getUser
type ReturnUser = ReturnType<GetUserType>

let u: ReturnUser = {
    name: ' hahah',
    age: 19
}

type Parameters<T> = T extends (...args: infer P) => any ? P : T
// 元祖
type ParamsTpe = Parameters<GetUserType>



// 获取构造函数实例的类型 InstanceType

class Person10 {
    name: string
    constructor(name: string) {
        this.name = name
    }
    getName() {
        console.log(this.name)
    }
}

// 获取类的构造函数的参数类型
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
type Parmas = ConstructorParameters<typeof Person10>


// 获取实例的类型
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any
type Person10Instance = InstanceType<typeof Person10>
let instance: Person10Instance = {
    name: '1111',
    getName() { }
}


// infer应用案例
// tuple转unio 元祖转联合
type ElementOf<T> = T extends Array<infer E> ? E : never
type Ttupel = [string, number]

type TupleToUniod = ElementOf<Ttupel>   //  'string'|'number'

// 联合类型转换成交叉类型
type T1 = { name: string }
type T2 = { age: number }

type ToIntersection<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never

type T3 = ToIntersection<{ a: (x: T1) => void, b: (x: T2) => void }>







