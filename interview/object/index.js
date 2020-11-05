/**
 * 深浅拷贝
 */

 // ...、 slice、 assign 都是浅拷贝

 // JSON.parse(), JSON.stringify()  可以实现深拷贝，但是不支持 函数、undefined 会忽略

 function deepClone(obj, hash = new WeakMap()){
    // 对当前拷贝对象进行判断
    if(obj == null) return obj  // 如果当前obj 是null或者undefined 直接返回
    if(obj instanceof Date) return new Date(obj)  // 如果是日期类型，也直接返回一个日期对象
    if(obj instanceof RegExp) return new RegExp(obj)  // 如果是正则同样，直接返回
    if(typeof obj !== 'object')  return obj  // 如果是基本类型直接返回，函数可以忽略，不需要拷贝
    if(hash.get(obj)) return hash.get(obj)
    let newObj  = new obj.constructor()

    hash.set(obj, newObj)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = deepClone(obj[key], hash)  // 进行递归深拷贝
        }
    }
    return newObj
 }

 let obj  = {
     name: 'jack',
     address:{
         x:10,
         y:20
     }
 }
 obj.o = obj

 let newO = deepClone(obj)
//  console.log(obj)
 newO.address.x = 10000
//  console.log(newO)



//  instanceof 原来，在原型链上查找，沿着__proto__向上查找
 function Animal(){
     this.name = '动物'
 }

 let a = new Animal()

 function _instanceof (L, R){
    if(!L || (typeof L !=='object' && typeof L !=='function')) return false
    if(typeof R !== 'function') throw Error('instance err')
    l = L.__proto__
    r = R.prototype
    while(true){
        if(l === r) return true
        if(l === null) return false
        l = l.__proto__
    }
 }

//  console.log(_instanceof(a, Object))


// Object.is() 判断两个数是否相等
Object.is = function(x, y){
    if(x === y){
        return x!==0 || 1/x !== 1/y 
    } else {
        return x!==x && y!==y
    }

}
