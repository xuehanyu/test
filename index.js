// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

// function flat(arr, depth = 0){
//     return depth <0 ? arr : arr.reduce((pre, cur)=>{
//         return pre.concat(Array.isArray(cur) ? flat(cur, depth-1) : cur)
//     }, [])
// }

// let result = flat(arr, Infinity)
// console.log([...new Set(result.sort((a, b)=>{
//     return a-b
// }))])


// 输入：nums = [1,2,3,4] 
// 输出：[1,3,6,10]
// 解释：动态和计算过程为 [1, 1+2, 1+2+3, 1+2+3+4] 
// const nums = [1, 2, 3, 4]
// var runningSum = function(nums) {
// 1）第一种方法
// let newArr = []
// nums.reduce((pre, cur, i) => {
//     let num = pre + cur
//     return newArr[i] = num
// }, 0) 
// return newArr
// 2) 第二种防范
// for(let i=1; i<nums.length; i++){
//     nums[i] += nums[i-1]
// }
// };

// const result = runningSum(nums)
// console.log(nums, 'result')




// 输入：nums = [8,1,2,2,3]
// 输出：[4,0,1,1,3]
// 解释： 
// 对于 nums[0]=8 存在四个比它小的数字：（1，2，2 和 3）。 
// 对于 nums[1]=1 不存在比它小的数字。
// 对于 nums[2]=2 存在一个比它小的数字：（1）。 
// 对于 nums[3]=2 存在一个比它小的数字：（1）。 
// 对于 nums[4]=3 存在三个比它小的数字：（1，2 和 2）。
// var smallerNumbersThanCurrent = function(nums) {
// // 1) 双重循环
// let arr = []
// for(let i=0; i<nums.length; i++){
//     let count = 0
//     for(let j=0; j<nums.length; j++){     
//         if(nums[i] > nums[j]) count ++
//     }
//     arr.push(count)
// }
// return arr
//     let newArr = [];
//     let oldNums = [...nums]
//     nums.sort((a, b)=> b-a)
//     let map = new Map()
//     for(let i=0; i<nums.length; i++){
//         let count = 0
//         for(let j= i+1; j<nums.length; j++){
//             if(nums[i] > nums[i+1]) count ++ 
//         }
//         map.set(nums[i], count)
//     }
//     for(let i=0; i<oldNums.length; i++){
//         newArr[i] = map.get(oldNums[i])
//     }
//     return newArr

// };

// const result = smallerNumbersThanCurrent([8,1,2,2,3])
// console.log(result)



// 输入：nums = [2,5,1,3,4,7], n = 3
// 输出：[2,3,5,4,1,7] 
// 解释：由于 x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 ，所以答案为 [2,3,5,4,1,7]

// var shuffle = function(nums, n) {
//     return nums.map((_v,i,arr)=>i%2? arr[n+Math.floor(i/2)]: arr[i/2])
// };
// const result = shuffle([2,5,1,3,4,7], 3)
// console.log(result)




let obj = {
    name: 'jack000000'
}

function fn(age, address) {
    console.log(this.name, age, address)
}

fn.prototype.say = function () {
    console.log('sayoooo')
}

let bindFn = fn.bind(obj, '18')
let o = new bindFn('北京')
o.say()

console.log('oooooo')
// Function.prototype.bind = function(context){
//     context = context || window
//     let fn = this
//     let outerArgs = [].slice.call(arguments, 1)
//     let Fn = function(){}
//     let bindFn = function(){
//         let innerArgs = [].slice.call(arguments)
//         const allArgs = [...outerArgs, ...innerArgs]
//         fn.apply( this instanceof bindFn ? this : context, allArgs )
//     }
//     Fn.prototype = fn.prototype
//     bindFn.prototype = new Fn()
//     return bindFn
// }
