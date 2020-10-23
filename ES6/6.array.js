//  数组的常见的方法

// map(some filter every, forEach)  es5
// map方法
let arr1 = [1,2,3]

Array.prototype.selfMap = function(fn){
   let arr = [].slice.call(this);
   return arr.reduce((pre, cur, index)=>{
      return [...pre, fn(cur, index, this)]
   }, [])
}
let result = arr1.selfMap(item=> item + 2)
console.log(result, arr1)

// Array.prototype.map = function(fn){
//    let result = []
//    const arr = [].slice.call(this)
//    for(let i=0; i<arr.length; i++){
//       result.push(fn(arr[i], i, arr))
//    }
//    return result
// }
// let result = arr.map(item=> item + 2)
// console.log(result, arr)
 

//   filter
let arr = [1,2,3,4]
Array.prototype.filter = function(fn){
   let result  = []
   let arr = [].slice.call(this)
   for(let i=0; i<arr.length; i++){
      if(!arr.hasOwnProperty(i)) continue
      fn(arr[i],i, arr) &&   result.push(arr[i])
   }

   return result
}
let result = arr.filter(item => item > 1)
console.log(result, arr)


// some 
let arr = [1,2,3,4];
Array.prototype.some = function(fn){
   let arr  = [].slice.call(this)
   if(!arr.length) return false
   for(let i=0; i<arr.length; i++){
      if(!arr.hasOwnProperty(i)) continue
      if(fn(arr[i],i,arr)) return true
   }
   return false
}
let result = arr.some(item=>item>6)
console.log(result)


//  find findIndex es6
let arr = [1,2,3,4,5]
console.log(arr.findIndex((item)=>item === 5 ))
// reduce  收敛、叠加

let arr = [1, 2, 3, 4]
Array.prototype.reduce = function(fn, pre){
   for(let i = 0 ; i< this.length; i++){
      if(typeof pre === 'undefined'){
         pre = fn(arr[i],arr[i+1],i+1,this)
         ++i
      } else {
         pre = fn(pre, arr[i], i, this)
      }
   }
   return pre

}
let result = arr.reduce((pre, cur, index, item)=>{
   console.log(pre, cur, index, item)
   return pre + cur
}, 0)
console.log(result)



//  includes

//  for of()

// 将类数组转换成数组，
//  常见的类数组有 htmlCollection, arguments, {0:1,1:2,length:2}
// Array.from()

function a(){
   console.log( Array.from(arguments).join('+'))
}

a(1,2,3)



// of()


let ary = Array.of(2)
console.log(ary)