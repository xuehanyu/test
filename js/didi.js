// let obj = {a:{b:{c:{d:1000}}}}
// //  实现一个find函数 find(obj,'a.b.c')  返回1    find(obj,'a.d.c')  返回undefined
// function find(obj,str) {
//     let res = str.split('.')
//     let result = obj[res[0]]
//     for(let i=1;i<res.length;i++){
//         if(result && result[res[i]]==='undefined'){
//             result = undefined
//         } else if(result) {
//             result = result[res[i]]
//         }
//     }
//     return result
// }

// let result1 = find(obj,'a.b.c.d')
// let result2 = find(obj,'a.d.c')
// console.log('result1=======>',result1)
// console.log('result2=======>',result2)


// function fn (...obj){
//     console.log(obj)
// }
// fn(1,2,3)



// let obj = [
//     {name:'zhangsan',age:10, grade:8},
//     {name:'lisi',age:18, grade:3},
//     {name:'xiaohong',age:8, grade:18}
// ]

// function sortBy(atrr){
//     return function(a,b){
//         a = a[atrr]
//         b = b[atrr]
//         if(a<b){
//             return 1
//         }else if(a>b){
//             return -1
//         }else {
//             return 0
//         }
//     }
// }

// let newArr = obj.sort(sortBy('age'))
// console.log(newArr)



// function mysort (arr) {
//     for(var i = 0; i < arr.length; i++){
//         console.log('iiiii')
//         for(var j = i + 1; j < arr.length; j++){
//             console.log('jjjjjjj')
//             if(arr[i] > arr[j]){
//                 var tmp = arr[i];
//                 arr[i] = arr[j];
//                 arr[j] = tmp;
//             }
//         }
//     }
// }
// var a = [3,1,2,8,9,11];
// mysort(a);
// console.log(a);


// let obj = {a:1,b:3}
// let ob1 = {...obj}
// console.log(ob1)


//  实现一个去重
// var arr = [1,2,3,4,2,1,5,8,6,2]
// function unique(arr){
//     let res = []
//     for(let i=0;i<arr.length;i++){
//         if(res.indexOf(arr[i])===-1){
//             res.push(arr[i])
//         }
//     }
//     return res
// }
// let result = unique(arr)

// console.log(result)


// const data = {
//     a:[{b:1},{c:2}],
//     b:{bb:{cc:11}}
// }

// function getObjectDataByKey(obj,key){
//   let res = key.split('.')
//   console.log(res,'resssss')   //   [a[0],b]
//   console.log(result,'0989')
//   for(let i = 1; i<res.length;i++){
//   	if(result && result[res[i]] === 'undefined'){
//     	result = undefined
//     } else if(result){
//     	result = result[res[i]]
//     }
//     return result
//   }
// }

// const result1 = getObjectDataByKey(data,'a[0].b')
// const result2 = getObjectDataByKey(data,'a[1].c') 
// const result3 = getObjectDataByKey(data,'b.bb.cc') 


// console.log(result1)



// let str = 'aaabbbbbccdddeeeffffff'
// function uniqueAndGetMax(str){
// 	let strArr = str.split('')
//     let res = []
// 	let numArr = []
//     let maxNum 
//     strArr.forEach((item,index)=>{
//     	if(res.indexOf(item)===-1){
//         	res.push(item)
//           numArr.push(1)
//         } else {
//         	numArr[res.indexOf(item)] ++
//         }
//     })
//     maxNum = numArr.sort((a,b)=>{
//     	return b-a
//     })
//     return {
//     	newStr:res.join(''),
//       	num:maxNum[0]
//     }
// }

// let result = uniqueAndGetMax(str)
// console.log(result)


let str = 'afjghdfraaaasdenasyys'
function getUniqueAndMax(str){
  let arr = str.split('')
  let strArr = []
  let numArr = []
  for(let i=0;i<arr.length;i++){
    if(strArr.indexOf[arr[i]]===-1){
      strArr.push(arr[i])
      numArr.push(1)  
    }else{
      numArr[strArr.indexOf(arr[i])] ++
    }
  }
  const maxArr = (numArr.sort((a,b)=> b-a))

  return maxNum
}

const result = getUniqueAndMax(str)
console.log(result)

// const obj = { a: { b: { c: 1 } }, d: 1,e:{f:0} }
// // flattenObject(obj); // { 'a.b.c': 1, d: 1 ,'e.f':0}
// function flattenObject(obj){
//   let resObj = {}
//   let arr = []
//   	for(let key in obj){
//       let str
//     	if(typeof obj[key]  ===  'object'){
//           resObj[key] = arguments.callee(obj[key])
//         } else {
//           resObj[key] = obj[key]
//         }
//     }
// 	return resObj
// }

// const result = flattenObject(obj);
// console.log(result)



// function fomatFloat(num,n){   
//   var f = parseFloat(num);
//   console.log(f,typeof f,'fff')
//   if(isNaN(f)){
//       return false;
//   }   

//   console.log(num*Math.pow(10, n),'0')
//   f = Math.round(num*Math.pow(10, n))/Math.pow(10, n); // n 幂  
  
//   console.log(f,'0987')
//   var s = f.toString();
//   var rs = s.indexOf('.');
//   //判定如果是整数，增加小数点再补0
//   if(rs < 0){
//       rs = s.length;
//       s += '.'; 
//   }
//   while(s.length <= rs + n){
//       s += '0';
//   }
//   return s;
// }  
// const result = fomatFloat('22222.3333',2)
// console.log(result)



// function formatStr(str){
//   let s = str.indexof('.')
//   console.log(s)
// }
//   formatStr ('123.98765')


//   ["1", "11", "111"].map((a,b)=>{
//     console.log(a,b,'')
//     return Number(a) + b 
//   })