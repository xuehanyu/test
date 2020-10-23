/**
 * 对象类型的数据检测
*/ 
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
const isArray = isType('Array')
console.log(isArray([]))


/**
 * 循环实现map
 */

Array.prototype.selfMap = function(fn,context){
    let arr = Array.prototype.slice.call(this)
    let newArr = []
    for(let i=0 ; i<arr.length;i++){
        if(!arr.hasOwnProperty(i)) continue
        newArr[i] = fn.call(context,arr[i],i,this)
    }
    return newArr
}
let reuslt = [1,2,3].selfMap(num => num * 2)
console.log(reuslt)


/**
 * 使用reduce实现map
 */

 Array.prototype.selfMap2 = function(fn,context){
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre,cur,index)=>{
        return [...pre, fn.call(context, cur, index, this)]
    },[])
 }

 let reuslt2 = [1,2,3].selfMap2((item,index)=>{
     return item * 2 + index
 })
 console.log(reuslt2)


 /**
  * 循环实现filter
  */
 Array.prototype.selfFilter = function(fn, context){
    let arr = Array.prototype.slice.call(this)
    let newArr = []
    for(let i=0; i<arr.length; i++){
        if(!arr.hasOwnProperty(i)) continue
        fn.call(context,arr[i],i,this) && newArr.push(arr[i])
    }
    return newArr
 }
 let filterResult = [1,2,3,4,5,6,7,8].selfFilter(item => item > 4)
 console.log(filterResult)

/**
 * reduce实现filter
 */
Array.prototype.selfFilter2 = function(fn, context){
    return this.reduce((pre,cur,index)=>{
        return fn.call(context,cur,index,this) ? [...pre,cur] : [...pre]
    },[])
 }
 let filterResult2 = [1,2,3,4,5,6,7,8].selfFilter2(item => item % 2 === 0)
 console.log(filterResult2)


/**
 * for 循环实现some
 */
 Array.prototype.selfSome = function(fn,context){
    let arr = Array.prototype.slice.call(this)
    if(!arr.length) return false
    for(let i=0; i<arr.length; i++){
        if(!arr.hasOwnProperty(i)) continue
        let res = fn.call(context, arr[i], i, this)
        if(res) return true
    }
    return false
 }

 let resultSome = [1,2,3,4,5,6].selfSome(item => item>20)
 console.log(resultSome)


 /**
  * for循环实现Every
  */
 Array.prototype.selfEvery = function(fn,context){
    let arr = Array.prototype.slice.call(this)
    if(!arr.length) return true
    for(let i=0; i<arr.length; i++){
        if(!arr.hasOwnProperty(i)) continue
        let res = fn.call(context, arr[i], i, this)
        if(!res) return false
    }
    return true
 }

 let resultAll = [1,2,3,4,5,6].selfEvery(item => item>-1)
 console.log(resultAll)

 /**
  * 实现reduce累加
  */
Array.prototype.selfReduce = function(fn,pre){
    for(let i=0; i<this.length; i++){
        if(!this.hasOwnProperty(i)) continue
        if(typeof pre === 'undefined'){
            pre = fn(this[i],this[i+1],i,this)
            ++i
        } else {
            pre = fn(pre,this[i],i,this)
        }
    }
    return pre
}
let total = [1,2, ,3,4, ,5].selfReduce((pre,cur) =>{
    return pre + cur
 },5)
 console.log(total)


 /**
  * 使用reduce实现数组的flat方法
  */

const selfFlat = function(depth = 1){
    let arr = Array.prototype.slice.call(this)
    if(depth === 0) return arr
    return arr.reduce((pre,cur)=>{
        if(Array.isArray(cur)){
           return [...pre, ...selfFlat.call(cur,depth-1)]
        }else {
           return [...pre, cur]
        }
    },[])
}
Array.prototype.selfFlat = selfFlat

let flatArr = [1,2,3,[4,5,[6,7],[3,4,[00,33]]]].selfFlat(3)
console.log(flatArr)

/***
 * 实现ES6的class语法
 */
function inherit(subType, superType){
    subType.prototype = Object.create(superType.prototype,{
        constructor:{
            enumerable: false,
            configurable: true,
            writable:true,
            value: subType
        }
    })
    Object.setPrototypeOf(subType, superType)
}



