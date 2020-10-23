//
const Promise = require('../../util/promise')

// let p = new Promise((resolve, reject)=>{
//     resolve(100)
// })

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

Promise.resolve(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
})).then(data => {
  console.log(data)
})

// Promise.resolve,  和Promise.reject 有什么区别

//  Promise.resolve 可以接受一个promise，有等待效果

// Promise.reject 接受promise不会有等待效果
