export {};

// 接口 用来描述对象的形状，根据接口 提供一些新的类 别人使用

// 计算 fullname = firstName + lastName

// interface 可以描述属性 方法 类
// 接口可以实现 被继承 type不能
// type 可以写联合类型
// 能用接口用接口，不能换成type
// 1） 描述对象
// interface IFullName {
//     firstName: string;
//     lastName: string;
// }

// const fullName = (obj: IFullName): IFullName => {
//     return obj;
// };
// fullName({ firstName: 'l', lastName: '3' });

// 2) 描述函数本身
// interface IFullName {
//     (firstName: string, lastName: string): string;
// }
// // type FullName = (firstName: string, lastName: string) => string;
// const fullName: IFullName = (firstName: string, lastName: string): string => {
//     return firstName + lastName;
// };

// 3)混合类型 既是函数又有属性 计数器 标示返回值的类型 一个函数返回一个函数，返回的函数有属性
// interface Icount {
//     (): number;
//     count: number;
// }

// const fn: Icount = () => {
//     return ++fn.count;
// };
// fn.count = 0;
// console.log(fn());

// 接口的特性
// interface Ivegetable {
//     taste: string;
//     color: string;
// }

// 1)如果我定义的值比接口中的多，可以采用类型断言，直接断言成对应的将接口
// const tomato: Ivegetable = {
//     size: 10,
//     taste: 'sour',
//     color: 'red',
// } as Ivegetable;

// 2) 多个同名的接口默认会合并
// interface Ivegetable {
//     size: number;
// }

//3) 基于原接口 扩展一个自己的接口  接口可以扩展
// interface Itamoto extends Ivegetable {
//     size: number;
// }
// const tomato: Itamoto = {
//     size: 10,
//     taste: 'sour',
//     color: 'red',
// };

// 4）可选属性，多个使用任意属性

interface Ivegetable {
    taste: string;
    color: string;
    [key: string]: any; // 任意接口除了限制死的，其他的随意，所有属性只要key是字符串，值是any都可以
}
const tomato: Ivegetable = {
    size: 10,
    taste: 'sour',
    color: 'red',
};

// 如果接口中[xxx:index]  可索引接口
interface Iarr {
    [key: number]: any;
}
let arr: Iarr = ['2', 3, {}];
let arr1: Iarr = { 1: 0, 2: '0' };

// 接口可以被类来实现
interface Speakable {
    // 接口中的内容都是抽象的，没有具体的实现
    name: string;
    speak(): void; // 描述类的原型方法，void表示不关心方法的返回值
}
interface ChineseSpeakable {
    speakChinese(): void;
}

class Speak implements Speakable, ChineseSpeakable {
    //可以实现继承多个接口
    speakChinese(): void {
        throw new Error('Method not implemented.');
    }
    name!: string;
    speak(): string {
        return '111';
    }
}

let s = new Speak();

// 类中有抽象类，，不能被实例化
abstract class Animal {}
