// 联合类型  默认可以认为时并集
export {};
let name: string | number; // 当没有初始化的时候，只能调用两者类型中的共同方法

// name.toString
// name.valueOf

name = 1;
name.toFixed();
// 会根据赋值 来推导出后续的方法
name = '111';
name.length;

let ele: HTMLElement | null = document.getElementById('#app');
ele?.style?.color; // 只能取值，不能赋值， 相当于ele && ele.style && ele.style.color

ele!.style.color = 'red'; // 非空断言，表示一定有值

// 可以做断言操作，也可以解决这个问题
(ele as HTMLElement).style.color = 'green';

// 双重断言

(ele as any) as boolean;

let direction: 'up' | 'down' | 'left' | 'right'; // 字面量类型

direction = 'down';

// 类型别名
type Direction = 'up' | 'down' | 'left' | 'right';
let reaction2: Direction = 'down';
