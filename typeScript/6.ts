// TypeScript的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。
//  在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

// 1、描述对象的形状
interface Speakable {
    name: string,
    speak(): void
}

let speakMan: Speakable = {
    name: 'jack',
    speak() { }
}


// 2、行为的抽象
// 同名的接口可以写多个，类型自动合并
interface Speakable {
    speak(): void
}
interface Eatable {
    eat(): void
}
class Person implements Speakable, Eatable {
    name: string;
    speak() {
        throw new Error("Method not implemented.");
    }
    eat(): void {
        throw new Error("Method not implemented.");
    }

}


//任意属性
interface Person2 {
    readonly id: number
    name: string
    [key: string]: any   // 任意属性
}

let p: Person2 = {
    id: 1,
    name: 'hahah',
    age: 10,
    address: 'jjjj'
}


// 接口的继承
interface Speakabele1 {
    speak(): void
}

interface SpeakChinese extends Speakabele1 {
    speakChinese(): void
}

class ChineseMan implements SpeakChinese {
    speakChinese(): void {
        throw new Error("Method not implemented.");
    }
    speak(): void {
        throw new Error("Method not implemented.");
    }
}

// 函数类型接口
interface Discount {
    (price: number): number
}

const disCount: Discount = (price: number): number => {
    return price * 0.8
}


// 可索引接口
// 对数组和对象进行约束

interface User {
    [index: number]: string
}

let user: User = {
    0: '0',
    1: '1'
}

let arrw: User = ['1', '9']