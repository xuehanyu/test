// export {};
// // 1.泛型
// // 🌰1: 实现一个函数，这个函数会返回任何传入它的值，如接受一个number类型的参数，返回一个numnber类型
// function id(arg: number): number {
//     return arg;
// }

// function id1(arg: number | string): number | string {
//     return arg;
// }

// function id2(arg: any): any {
//     return arg;
// }

// function id3(arg: string): string;
// function id3(arg: number): number;
// function id3(arg: any): any {
//     return arg;
// }

// let r = id3(11);

// function id5<T>(arg: T): T {
//     return arg;
// }

// let r1 = id5<string>('11');
// let r2 = id5(true);

// // 泛型 -- 泛指的类型，指在定义函数、类、接口、类型别名的时候，不预先指定具体的类型，
// // 而在使用的时候指定具体的类型

// // 2、在函数中使用泛型
// // 🌰：上边的例子就是在函数中使用泛型

function id6<T>(arg: T): T {
    return arg;
}
// // 2.1 调用方法
// let r3 = id6<string>('11'); // 显示的传递类型参数
let r4 = id6(true); // 利用类型推论

// // 2.2 泛型可以使用多个
// // 🌰：实现一个元祖交换 [string, number]  ---> [number, string]
// function swap<T, K>(tuple: [T, K]): [K, T] {
//     return [tuple[1], tuple[0]];
// }
// swap<string, number>(['1', 2]);

// // 2.3 泛型类型，用泛型声明一些类型，如利用函数表达式定义函数
// const id8: <U>(arg: U) => U = <T>(arg: T): T => {
//     return arg;
// };
// // 还可以使用对象字面量来定义泛型函数
// const id9: { <T>(arg: T): T } = <T>(arg: T): T => {
//     return arg;
// };

// // 3.泛型接口
// interface IID<T> {
//     (arg: T): T;
// }
// const id10: IID<string> = <T>(arg: T): T => {
//     return arg;
// };

// let r6 = id10('111');

// // 4.泛型类
// class MyArray<T> {
//     public arr: T[] = [];

//     add(v: T) {
//         this.arr.push(v);
//     }
// }

// let arr = new MyArray<number>();
// arr.add(1);
// arr.add(2);

// // 5、泛型约束 extends 关键字 T中必须包含U中的属性
// interface WithLen {
//     length: number;
// }
// function id15<T extends WithLen>(arg: T): T {
//     console.log(arg.length); // Property 'length' does not exist on type 'T'.
//     return arg;
// }

// id15('222');
// // keyof T 表示取对象中所有的key属性
// function getVal<T extends Object, K extends keyof T>(obj: T, key: K) {
//     return obj[key];
// }

// getVal({ a: '1', b: '2' }, 'a');

// type MyType = <T>(arg:T)=>T
// let id:MyType  = <T>(arg: T): T=>{
//     return arg
// }


// let p: Person = {
//     name: 'd',
//     age: 10,
// };

type Partial<T> = {
    [K in keyof T]?: T[K];
};

type Person1 = Partial<Person>;

type Key = keyof any;
type T2 = keyof (string | number);

type T3 = keyof number;

let p1: Person1 = {};

export {};

let obj = {
    0: 'aaaa',
};
console.log(obj);


type P = [number, string, boolean];
type Q = Date;

type R = [Q, ...P];
let r: R = [new Date(), 2,'st',true]


interface Person {
    name: string;
    age: number;
    obj:{
        x:number,
        y:number
    }
}
type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

type PartialedWindow = DeepPartial<Person>;
type Par = Partial<Person>

type Fn = <T>(arg:T) => T
type IFn = {
    <T>(arg:T): T
}
const fn: Fn= <T>(arg:T):T=>{
    return arg
}

function fn2<T>(arg:T){
    return arg
}
let rn = fn(10)
let rn2 = fn2(10)

function join<T>(first: T, second: T) {
    return `${first}${second}`;
}
join('0', '0');


interface Iid{  // 写到函数上的泛型，调用函数的时候传类型
	<T>(arg:T): T;
}
let id:Iid = <T>(arg: T): T => {
    return arg;
};



interface Lib<T>{
    (value:T):T
    name: T
    doSomething:(action:T): T
}

let fnlib: Lib<string> = <T>(arg:T): T=>{
    return arg
}

