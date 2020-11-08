// 将类数组转换数组的方法

function test() {
    // 1) ... 扩展运算符
    // console.log([...arguments])  
    // 2) Array.from()  此方法可以将两类对象转换为真正的数组，类数组对象和可遍历的对象 es6的写法
    // 
    // let a = Array.from(arguments)    
    // 3） Array.from() es5的实现 Array.prototye.slice
    // let a = Array.prototype.slice.call(arguments)
    // let a = [].slice.call(arguments)
    // 4) Set数据结构
    // let a = [...new Set(arguments)]
    let a = [].map.call(arguments, item => item)
    let b = [].filter.call(arguments, item => item)
    console.log(b)
}
// Array.of 方法用于将一组值，转换为数组
// let arr = Array.of(1,3,5,8)
// console.log(arr)
// test(1,2,3,4,5,6)


//  去重
// 1） 类用set数据结构
let arr = [1, 6, 2, 1, 8, 6, 9, 2, 5, 1]
// let newArr = [...new Set(arr)]
//  Array.from(new Set(arr));
// console.log(newArr)

// 双重循环
// function unique(arr){
//     for(let i=0; i< arr.length; i++){
//         for(let j=i+1; j<arr.length; j++){
//             if(arr[i]===arr[j]){
//                 arr.splice(j,1)
//                 j--
//             }
//         }
//     }
//     return arr
// }

// // 利用indexof
// function unique(arr){
//     let newArr = []
//     for(let i=0; i<arr.length; i++){
//         if(newArr.indexOf(arr[i])===-1){
//             newArr.push(arr[i])
//         }
//     }
//     return newArr
// }

// // 利用includes
// function unique(arr){
//     let newArr = []
//     for(let i=0; i<arr.length; i++){
//         if(!newArr.includes(arr[i])){
//             newArr.push(arr[i])
//         }
//     }
//     return newArr
// }
// 利用fileter + indexOf
// function unique(arr){
//     return arr.filter((item, index)=> arr.indexOf(item)===index)
// }

//  
// function unique(arr) {   // 双重循环性能较好
//     const newArray = [];
//     let isRepeat;
//     for (let i = 0; i < arr.length; i++) {
//         isRepeat = false;
//         for (let j = 0; j < newArray.length; j++) {
//             if (arr[i] === newArray[j]) {
//                 isRepeat = true;
//                 break;
//             }
//         }
//         if (!isRepeat) {
//             newArray.push(arr[i]);
//         }
//     }
//     return newArray;
// }


// 利用排序
// function unique(arr){
//     let newArr = []
//     arr.sort()
//     for(let i=0; i<arr.length; i++){
//         if(arr[i]!==arr[i+1]){
//             newArr.push(arr[i])
//         }
//     }
//     return newArr
// }


// 利用map
function unique(arr){
    const tmp = new Map()
    return arr.filter((item)=>{
        return !tmp.has(item) && tmp.set(item,1)
    })
}

let result = unique(arr)
console.log(result, '000')
