const Promise = require('../../util/promise')
const fs = require('fs')

// function read(...args){
//     let dfd = Promise.defer()   //  延迟对象，可以用于解决promise的嵌套问题
//     fs.readFile(...args, function(err, data){
//         if(err) dfd.reject(err);
//         dfd.resolve(data)
//     })
//     return dfd.promise
// }
//  自己实现一个方法，可以将异步的node方法转化成promise
function promisify (fn) {
  return function (...args) { // 相当于readFile函数，接收一定的参数
    return new Promise((resolve, reject) => {
      // fn  fn相当于fs.readFile
      fn(...args, function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

// let { promisify } = require('util')
const readFile = promisify(fs.readFile)
//  可不可以直接将node的异步方法转化成promise方法
readFile('./name.txt', 'utf8').then(data => {
  return readFile(data, 'utf8')
}).then(data => {
  console.log(data, 'then55')
}).catch(err => {
  console.log(err, 'fail')
})

// // 层层嵌套，可以利用promise进行优化
// fs.readFile('./name.txt','utf8', function(err, data){
//     if(err){

//     }

//     fs.readFile(data,'utf8', function(err,data){

//         if(err){

//         }
//         console.log(data)
//     })
// })
