// 1 什么是泛型
// 1.1泛型函数
export {};
function copy(arg: string): string {
    // 这个函数会返回传入它的值，如它接收一个stirng类型的参数，返回一个string类型的参数
    return arg;
}
// 1、10 首先想到any

function copy1(arg: any): any {
    return arg;
}

function copy2<T>(arg: T): T {
    return arg;
}

let result = copy2<string>('2');
let result1 = copy2('2');

//1.2 泛型变量（作为类型的一部分使用）
// 使用泛型创建像copy这样的泛型函数时，编译器要求你在函数题必须正确使用这个通用的类型，
// 换句话说，必须把这些参数当作时任意或所有类型，
// 如果我们想打印出参数的长度，
function copy3<T>(arg: T): T {
    // console.log(arg.length);// Property 'length' does not exist on type 'T'
    return arg;
}
// 报错，这些类型变量代表的是任意类型，所以使用这个函数的人可能传入数字，数字没有lengt属性
//  现在假设我们想操作的T类型的数组而不是直接T，由于我们操作的是数组，所以.length属性应该是存在，
// 我们像创建其他数组一样创建这个数组：
function func<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}
func(['1']);
// 泛型函数func 接收类型参数T和参数arg，它是一个元素类型为T的数组，并且返回元素类型为T的数组，如果我们传入数字数组，
// 返回一个数字数组，因此此时T的类型是number，这可以让我们把泛型变量T当作类型的一部分使用，而不是整个类型，增加了灵活性

// 1.3定一个多个泛型

// 1.4泛型约束extends(根据上边的例子length)

interface LengthWise {
    length: number;
}

function fn<T extends LengthWise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

fn({ name: '3', length: 21 });

// 2、类中的泛型
class GenericClass<T> {
    zeroValue: T;
    constructor(a: T) {
        this.zeroValue = a;
    }
}

let instance = new GenericClass<number>(1);

// 3.泛型类型 泛型还可以作为type的声明，用泛型声明一些类型

const f1: () => string = () => {
    return '11';
};

// 3.1 用泛型接口来定义函数类型
interface GenericFn<T> {
    (arg: T): T;
}
function f2<T>(arg: T): T {
    return arg;
}

const myFn: GenericFn<number> = f2;
let n = myFn(1);
console.log(n);

//4 泛型的应用
//4.1 keyof

// 编译之后



let myAdd : (x: number, y: number) => number =  (x: number, y: number): number =>{
    return x+y
}


type A<T = string> = Array<T>;
const aa: A = [1]; // type 'number' is not assignable to type 'string'.
const bb: A = ["1"]; // ok
const cc: A<number> = [1]; // ok