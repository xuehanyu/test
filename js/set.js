// const s = new Set()
// const arr = [2,3,5,4,5,7,3,1]
// arr.forEach(item => {
//     s.add(item)
// });
// for(let i of s){
//     console.log(i)
// }
// console.log(s)

const s = new Set([1,2,3,2,1])
s.add(2).add(6).add(8)

// for(let item of s){
//     console.log(item)
// }

s.forEach((key,value)=>{
    console.log(key+'---',value)
})