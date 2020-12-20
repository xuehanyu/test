// pick 摘取某一项返回 从对象中提取一部分属性
export { }

interface Person {
    name: string,
    age: number,
    gender: number
}

let person: Person = { name: 'jack', age: 10, gender: 0 }

type KeyOfPerson = keyof Person  // key的联合类型 'name'|'age'|'gender'

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type PickPerson = Pick<Person, 'name' | 'age'>


// extract 的区别

// 有条件类型分发
type Extract<T, U> = T extends U ? T : never
type E = Extract<string | number | boolean, string | number>


// Record  从一个类型中所有属性值都映射到另一个类型上，并创建一个新的类型

function map<K extends string | number, T, U>(obj, map) {

}