// 解构赋值，  声明和赋值放在一起了
// 解构表示 等号左边和右边解构类似
// 如果数组，位置必须相同

let [, age] = ['jack', 18]
console.log(age)

//  如果对象解构，名称必须相同
// 如果是关键字，需要改名 采用：的形式
let { length } = ['jack', 18]
console.log(length)

// r如果想设置某个属性的默认值 采用=的形式

let { name, age, default: d } = { name: 'jack', age: 10, default: 'xxxx' }
console.log(name, age, d)


let [, { address: [, a] }] = [
    { name: 'hah' },
    { age: 19, address: [1, 20, 3] }
]

console.log(a)