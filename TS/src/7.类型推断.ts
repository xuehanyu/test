// 类型推断
// 1、当赋值的时候会进行推断

// 赋值推断, 不赋值的时候是any类型，会根据值进行推断
let str = ''
// 2、函数默认会进行推断， 函数会根据右边的赋值 推到左边的类型, 不用特意标注类型
// 3、返回值的推断
const sum = (a:string, b:string) => {
    return '1111'
}   
// 4、属性推断=
let school = {  // 需要限制必须要添加类型
    name: 'jack',
    age: 11
}

let {name , age} = school  // 取出属性会自动进行类型推断

interface Ischool {// 通过索引访问操作符 获取类型
    name: string,
    age:number,
    address:{
        n: string
    }
}

type n = Ischool['address']['n']   //接口中取属性，只能用[]


// 类型反推 extends keyof typeof 关键字
type MySchool = typeof school  // 把某个类型拿出来继续使用
export {}
