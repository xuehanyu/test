export {};

class Pointer {
    x: number; // 表示实例上有这个属性 相当于public
    y: number;
    constructor(x: number, y?: number) {
        // 这些参数，函数中的使用方法一样
        this.x = x;
        this.y = y as number;
    }
    static a = 1;
}

// 类的修饰符 public private protected readonly
// public 表示父类，子类，外边实例都能访问
// protected  表示父类，子类，外边实例不能访问
// private  表示自己能访问

// 如果construct被标示了protected 或者private 则此类不能被new
let pointer = new Pointer(1, 2);
