/**
 * 浅拷贝与深拷贝
 * 一、深拷贝 : 拷贝后的结果更改是不会影响拷贝前的，拷贝前后是没有关系的
 * 二、浅拷贝 : 改变拷贝前的内容，会对拷贝之后的有影响，拷贝前和拷贝后的是有关系的
 */


//  引用关系
//  ...运算符只能拷贝一层（浅拷贝）
// let obj = { name: 'jack', address:{x:100, y:100} }
// let newO = { ...obj }
// obj.name = 'jay'
// obj.address.x =200
// // console.log(obj , newO)


// let a = [1,2,3]
// let arr = [a]
// let newArr = arr.slice();  //  拷贝的a的引用地址
// newArr[0][0] = 100

// console.log(arr, newArr, a)


//  深拷贝
// 1） JSON.stringify() 、 JSON.parse() 缺点: 不完成整，不能实现复杂的拷贝，比如函数、undefined会丢失
// let obj = { name: 'jack', address:{x:100, y:100}, fn: function (params) {}, un: undefined }
// let newO = JSON.parse(JSON.stringify(obj))
// obj.address.x = 200
// console.log(obj, newO)


//  2）实现一个递归拷贝
function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) return obj   // 用 == 判断obj是undefined 或者是null,不需要拷贝直接返回
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (typeof obj !== 'object') return obj  //  如果obj 是一个普通值，直接返回， 如果是函数的话，不需要拷贝
    if (hash.get(obj)) return hash.get(obj)
    let newObj = new obj.constructor()
    hash.set(obj, newObj)
    // 是对象的话就要进行深拷贝、
    for (let key in obj) {
        // 实现一个递归拷贝
        newObj[key] = deepClone(obj[key], hash)
    }
    return newObj
}
let obj = { name: 'jack', address: { x: 100, y: 100 } }
obj.o = obj
let deepObj = deepClone(obj)
console.log(deepObj)












let obj = { name: 'jack', age: 10, addres: ['黑龙江', '北京'] }
function deepClone(obj) {
    if (obj == null) return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (typeof obj !== 'object') return obj
    let newObj = new obj.constructor()
    for (let key in obj) {
        newObj[key] = deepClone(obj[key])
    }
    return newObj
}
let newObj = deepClone(obj)
console.log(obj, newObj, '0000')