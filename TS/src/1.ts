export {}
// npm install ts-node -g  通过全局安装ts的node环境可以通过run code跑代码

// 构建工具 webpack rollup 实时看出编译的结果以及映射的文件

// ts中拥有的类型 
// 1、基础类型
let str:string = '111'
let num:number = 1
let boo:boolean = true


// 元祖，表示长度和个数都限制好了
// 可以像元祖中添加内容，不能通过索引添加属性
// 只能放入元祖中已经声明过的属性
let tuple:[string, number, boolean] = ['1',2,true]
tuple.push(true)


// 数组， 存放一类类型的集合
let arr1: number[] = [1,2,3]
let arr2: string[] = ['1','3','5']
// 联合类型可以看作并集，既能使用数字，又能使用字符串
let arr3: (string| number)[] = ['1',3]
// 可以使用泛型
let arr4: Array<string|number> = ['1',1]


// 枚举类型 
// 默认可以正向取出，也可以反向取
enum USER_ROLE {
    USER = 'a',   // 默认下标是从0 开始
    ADMAIN = 1,
    MANAGE
}
console.log(USER_ROLE[1])


//  异构枚举 可以在枚举中放不同的类型，可以通过数字，自动向下推断

// 常量枚举， 只提供了一个类型

const enum USERS{  // 语义化
    ADMIN,
    MANAGE
}
console.log(USERS.ADMIN)

// any 类型，不进行类型检测的类型， 相当于没写类型

// null 和 undefined 任何类型的自类型， 在严格模式下，只能将null和undefined赋予给null 和undefined


// void 空类型 只能接受null 和undefined，函数的返回值

//  函数默认的返回值是undefined，默认在严格模式下不能将null 赋给void
let v:void
// v =  null


// never 类型 永远不， 是任何类型的子类型 可以把never赋予给任何类型

//Symbol

// BigInt

// 对象类型 非原始数据类型 object



// number Number string String的区别

// 在使用基本数据类型时， 会将原始类型 包装对象类型

let number1:number = 11
let number2:Number = 11
let number3:number = Number(111)
// let number4:number = new Number(111) // 错误语法，不能把实例赋予给基本类型
let number5:Number = new Number(1)
// 类也是一个类型，可以描述实例

