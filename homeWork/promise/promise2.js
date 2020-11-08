let fs = require('fs')
let Promise = require('./promise.js')
// 层层嵌套  利用promise 进行优化
// fs.readFile('./name.txt', 'utf8', function(err, data){
//     if(!err){
//         fs.readFile(data, 'utf8', function(err, value){
//             console.log(value)
//         })
//     }
// })
// node提供了一个promisify方法，可以将异步的node方法封装成 promise
// let { promisify } = require('util') 
function promisify(fn){  // 接收一个函数，node中任意的异步方法，此例子中值得是fs.readFile
    return function(...args){
        return new Promise((resolve, reject)=>{
            fn(...args, function(err, data){
                if(err) reject(err)
                resolve(data)
            })
        })
    }
}

let readFile = promisify(fs.readFile)
// function read(...args){
//     return new Promise((resolve, reject)=>{
//         fs.readFile(...args, function(err, data){
//             if(err) reject(err)
//             resolve(data)
//         })
//     })
// }

readFile('./name.txt','utf8').then((data)=>{
    return readFile(data,'utf8')
}).then(data=>{
    console.log(data)
})