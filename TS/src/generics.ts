export {}
// 1、为什么要使用泛型
// 1.1 支持多种类型的方法
    function id(arg:number):number{
        return arg
    }
    let r = id(3)
    // 联合类型 代码冗余，重复编写
    function id1(arg:number|string):number|string{
        return arg
    }
    let r1 = id1('3')
    // any类型 丢失类型检测，传入类型与返回类型应该相同
    function id2(arg:any):any{
        return arg
    }
    let r2 = id2('3')
    r2.length
    r2.toFixed(2)
    // 函数重载
    function id3(arg:string):string
    function id3(arg:number):number
    function id3(arg:any):any{
        return arg
    }
    id3('string')
    id3(1)


// 2、泛型相关用法
// 2.1 泛型概念
    // 泛指的类型，不预先指定具体的类型，在使用时才确定。在标志符后面使用<T> T自定义 U、K、P等等都经常会用到。
// 2.2 使用多个泛型
    function swap<T,K>(tuple:[T, K]):[K,T]{
        return [tuple[1], tuple[0]]
    }
    let tup = swap<string, number>(['1',3])
// 2.3 默认泛型
    type A<T=string> = Array<T>
    const a:A=['3']
    const b:A<number> = [33]
// 3、泛型函数   
// 3.1 定义
    function id5<T>(arg:T):T{
        return arg
    }
// 3.2 调用方法 显示传递参数、类型推论
    let r5 = id5<string>('2')
    let r6 = id5(true)


// 3.3 泛型类型
    type Iid6 = <U>(arg: U) => U
   

// 4、泛型接口
interface Iid  {
    <T>(arg:T):T,

}
const id6: Iid  = <T>(arg:T):T=>{
    return arg
}
let ree = id6<number>(0)

// interface Iid<T> {
//     (arg:T):T
//     name:T,
//     doSomething(arg:T):T
// }
// const id6: Iid<string>  = <T>(arg:T):T=>{
//     return arg
// }
// id6.name = 'jjiij'
// id6.doSomething = (arg) => arg

let re = id6('00')
// 5、泛型类
class MyArray<T>{
    arr:T[]= []
    add(v:T){
        this.arr.push(v)
    }
}
let arr = new MyArray<number>()
arr.add(2)
arr.add(4)
arr.add(3)
// 6、泛型约束



// 7、泛型的应用
