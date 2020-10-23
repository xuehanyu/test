/**
 * flat 可以按照指定的深度递归数字，将其扁平化，返回新的数组，不影响原数组
 * 语法：
 * let newArr = arr.flat(depth) // 默认深度为1，可以无限展开
 */

// 展开一层数组的方法，等效于flat()

//1、利用展开运算符
let arr = [1, 2, 4, [5, 6]]
console.log([].concat(...arr))

//2、利用reduce
let result = arr.reduce((pre, cur) => pre.concat(cur), [])
console.log(result)


// 展开指定深度的数组

// 1、利用reduce

let arr1 = [1, 2, [3, 4, [5, 6, 7]], 8]
function flatR(arr, depth) {
    console.log(arr, depth)
    return depth > 0 ? arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flatR(cur, depth - 1) : cur), []) : arr
}

//  2、利用forEach 
function flatEach(arr = [], depth = 1) {
    let result = [];
    (function flat(arr, d) {
        arr.forEach(item => {
            if (d > 0 && Array.isArray(item)) {
                flat(item, d - 1)
            } else {
                result.push(item)
            }
        })
    })(arr, depth)
    return result
}

console.log(flatEach(arr1, 3))



// 数字没有 length 属性
const sum = (a, b, c = '') => a + b + c
const len = str => str.length
const add$ = origin => `$${origin}`

const compose = (...fns) => fns.reduce(function (memo, curFn) {
    return function (...args) {
        return memo(curFn(...args))
    }
})

console.log(compose(add$, len, sum)(1, 2))




let arr = [1,2,[3,4,[5,6, [2,0]]]]

Array.prototype.flat = function(depth = 1){
    let arr = [].slice.call(this)
    return depth > 0 ? arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur) ? [].flat.call(cur,depth-1) : cur ) ,[]) : arr
}
let result = arr.flat(10)
console.log(result)