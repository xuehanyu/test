//1、什么是泛型（Generics）泛指的类型，到底是哪个具体的类型，我们不知道
// 泛型是指在定义函数、接口、类、类型别名的时候，不预先指定具体的类型，而在使用的时候在指定类型的一种特性
//首先，我们定义一个函数，它接口一个string类型的参数，返回一个stirng类型
function copy(data: string): string {
    return data;
}

function join<T>(first: T, second: T) {
    return `${first}${second}`;
}
join<string>('0', '0');
// 但是，如果我们想接收一个number类型的参数，并且返回一个number类型的参数呢？可以再写一遍，如果在来10种，就需要
// 定义10种，显然代码很冗余，想到any

function copy1(data: any): any {
    return data;
}
// any虽然行的通，但是和普通js写法没什么区别，丢失了所有类型的概念，传入的类型与返回的类型应该是相同的。
// 如果我们传入一个数字，我们只知道任何类型的值都有可能被返回。

// 因此我们需要一种方法使返回值与传入参数的类型相同，这里，我们是用了类型变量， 它是一种特殊的变量，只是表示类型，
// 而不表示值 这里就用到了泛型，

function copy2<T>(data: T): T {
    return data;
}
// 2种使用方法 传入所有参数，包括类型参数
let r = copy2<string>('111');
// 利用类型推论- 编译器会根据我们传入的参数自动的帮助我们确定T的类型
// let r = copy2('111')

// 1.2 多类型参数，定义多个泛型
function join1<T, U>(first: T, second: U) {
    return `${first}${second}`;
}
join1<string, number>('1', 2);

// 1.3 作为类型的一部分
function map0<T>(params: T): T {
    // console.log(params.length); 报错
    return params;
}

function map<T>(params: T[]): T[] {
    return params;
}

map<string>(['222']);

function a() {
    return;
}

// 类中的泛型 以及泛型类型
// data 不仅仅可以存放string类型的数组，还可以存放其他类型的数组 利用联合类型 ｜ ，
// class DataManage {
//     constructor(private data: string[] | number[]) {}
//     getItem(index: number): string | number {
//         return this.data[index];
//     }
// }

// const data = new DataManage(['11']);

// data.getItem(0);

// 利用泛型，解决灵活型的问题
// class DataManage<T> {
//     constructor(private data: T[]) {}
//     getItem(index: number): T {
//         return this.data[index];
//     }
// }

// const data = new DataManage<number>([1]); // 类里边最基础的泛型

// data.getItem(0);

// .name属性 数据具体项是否有name我是不知道的，如何解决，定义一个interface,必有一个name，类型是string
// 让T泛型继承extends Item，意思是我的泛型必须拥有item中的所有东西

// interface Item {
//     name: string;
// }
// class DataManage<T extends Item> {
//     // 类里面声明了泛型T 不知道什么类型  继承了Item 意思是未来对应具体的类型，具体的类型一定要有item中的所有的东西
//     constructor(private data: T[]) {}
//     getItem(index: number): string {
//         return this.data[index].name;
//     }
// }

// const data = new DataManage([{ name: '2' }]); // 类里边最基础的泛型

// data.getItem(0);

// 希望泛型只能对应number或者是string 而不是自定义的Test类型  类型约束
interface Test {
    name: string;
}
class DataManage<T extends string | number> {
    // 类里面声明了泛型T 不知道什么类型  继承了Item 意思是未来对应具体的类型，具体的类型一定要有item中的所有的东西
    constructor(private data: T[]) {}
    getItem(index: number): T {
        return this.data[index];
    }
}

const data = new DataManage<number>([]); //

// 泛型类型  泛型还可以作为type的声明，用泛型声明一些类型
//() => string  对funciton 类型的一个注解
const func: () => string = () => {
    return '111  ';
};

// 如何使用泛型作为一个具体的类型注解
// 函数接收一个泛型， 用泛型的概念，对函数的类型做了一个约束, 实现对函数的类型做一个匹配
function hello<T>(params: T) {
    return params;
}
const func1: <T>() => string = <T>() => {
    return '111  ';
};

const func2: <T>(params: T) => T = hello;
