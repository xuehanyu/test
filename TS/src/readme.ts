export {}
// 1、为什么要使用泛型
// 1.1 支持多种类型的方法
    function id(arg: number): number {
        return arg;
    }

    // 联合类型 代码冗余，重复编写

    function id1(arg: number|string): number|string {
        return arg;
    }
    // any类型 丢失类型检测，传入类型与返回类型应该相同
    function id2(arg: any): any {
        return arg;
    }
    let r = id2('string')
    r.length // ok
    r.toFiexd() // 也是OK
    // 函数重载
    function id3(arg: string): string;
    function id3(arg: number): number;
    function id3(arg: any): any {
        return arg;
    }
    let r2= id3(2)
    let r3= id3('o')

// 2、泛型相关用法
// 2.1 泛型概念
    // 泛指的类型，不预先指定具体的类型，在使用时才确定。在标志符后面使用<T> T自定义 U、K、P等等都经常会用到。
// 2.2 使用多个泛型
    function swap<T,K>(tuple:[T,K]):[K,T]{
        return [tuple[1], tuple[0]]
    }
    swap<string, number>(['1',4])
// 2.3 默认泛型
    type A<T = string> = Array<T>
    let a: A = ['3']
    // let aa: A = [2] // Type 'number' is not assignable to type 'string'.
    let aaa: A<number> = [2]
    
// 3、泛型函数  
// 3.1 定义
    function id5<T>(arg:T):T{
        return arg
    }
    let r6 = id5<string>('0') 
    let r7 = id5(9) 
// 3.2 调用方法 显示传递参数、类型推论
// 3.3 泛型类型(泛型还可以作为type的声明，用泛型声明一些类型。)
    type Iid =  <T>(arg: T) => T
    const id6: { <T>(arg: T):  T } = <T>(arg:T): T=>{
        return arg
    }
// 4、泛型接口(接口的使用有两个地方可以使用泛型，)
    // interface IId {
    //     <T>(arg: T):  T
    // }
    // const id7: IId = <T>(arg:T): T=>{
    //     return arg
    // }
    // id7<string>('0')

    interface IId<T> {
        (arg: T):  T
    }
    const id7: IId<number> = <T>(arg:T): T=>{
        return arg
    }
    id7(9)
    

// 5、泛型类
    class MyArray<T>{
        arr:T[] = []
        add(v:T){
            this.arr.push(v)
        }
    }
    let arr = new MyArray<string>()
    arr.add('999')
    // arr.add(1)
// 6、泛型约束 extends 关键字 T extends U  约束T中一定满足U中的条件
    interface WithLen {
        length: number
    }
    function id9<T extends WithLen>(arg:T): T {
        console.log(arg.length)  // Property 'length' does not exist on type 'T'.
        return arg;
    }
    // id9(222)
    id9('09876')
    id9([])
    id9({length: 9})


    function getVal<T extends Object, K extends keyof T>(obj:T, key:K){
        return obj[key]
    }
    getVal({a:'2', b:'3'}, 'a')
    
    type B = keyof any
    type C = keyof string
    type D = keyof number
// 7、泛型的应用


interface Ifn<T>{
    (arg:T):T 
    name1:T
}

const fn9: Ifn<number> =(arg)=>{
    return arg
}
fn9(1)
fn9.name1 = 1
// fn9.name1 = 'i'