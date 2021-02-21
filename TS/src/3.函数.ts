//对函数进行类型表示

// 考虑入参 和函数的返回值
// 1)
// function sum(a: string, b: string) {
//     // 声明不赋值就是any类型
//     return a + b;
// }

// 2)如果使用的是表达式，你给她定义了类型，你可以把一个可以兼容的函数赋值给ta
type Sum = (a1: string, b1: string) => string;

let sum: Sum = (a: string, b: string): string => {
    return a + b;
};

sum('2', '2');

//函数重载 一个函数有很多中功能，针对每个参数的不同的类型进行不同的处理
// 希望把一个字符串或者数字转换成一个数组
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: string | number) {
    if (typeof value === 'string') {
        return value.split('');
    } else {
        return value
            .toString()
            .split('')
            .map((item) => parseInt(item));
    }
}

toArray(111);
