// 1、泛型
// 1.1 支持多种类型的方法
function id<T>(arg:T):T{
    return arg
}
id('e')
interface Person {
    name:string,
    age:number
}


type MPerson = Partial<Person> & {phone: string}

let m:MPerson ={
    age:10,
    phone:'2'
}
// 2、