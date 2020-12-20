const num: number = 10

let str: string = 'hello'

const boo: boolean = false

str = '212'

let arr: Array<number> = [1, 2, 3]

let arr2: number[] = [1, 2, 4, 6]

// 元组 Tuple 允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
let x: [string, number]
x = ['1', 19]

// 枚举 enum 类型是对js标准数据类型的一个补充
enum Color { Red = 1, Green, Blue }
let c: Color = Color.Blue
console.log(Color[1], Color['Red'], Color.Green)

//Any
let arr3: any[] = [1, '2', true]

let notSure: any = 3
notSure.toFixed(2)

let prettySure: Object = 3

// Void  某种程度上，void类型与any类型相反，它表示没有任何类型，当一个函数没有返回值时
function fn(): void {
    console.log('fn')
}


let unusable: void = undefined

// null 和 undefined 默认情况下是所有类型的子类型, 可以把null 和undefined赋值给number类型变量，如果strictNullChecks为true则不可
let u: number = 1
let s: string = undefined


// Never never类型表示的是那些用不存在的值的类型
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
//  返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}


function foo() {
    // okay to capture 'a'
    return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();

let a;