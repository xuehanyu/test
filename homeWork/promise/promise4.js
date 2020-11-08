let Promise = require('./promise')
const { resolve } = require('path')

Promise.resolve = function(value){   // 创建一个成功的Promise
    return new Promise((resolve, reject)=>{
        resolve(value)
    })
}

Promise.reject = function(value){   // 创建一个失败的Promise
    return new Promise((resolve, reject)=>{
        reject(value)
    })
}

let promise = new Promise((resolve, reject)=>{
    resolve(100)
})

Promise.reject(new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(2222)
    })
})).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err,'eee')
})


// Promise.resolve 和 Promise.reject的区别

// Promise.resolve 可以接收一个promise， 有等待的效果，可以等待promise执行完，将结果返回
// Promise.reject 接收promise不会有等待的额效果，直接将改promise 返回
