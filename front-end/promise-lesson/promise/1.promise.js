//  1、promise的标准 https://promisesaplus.com/
// 目前低版本浏览器ie 不支持，需要polyfill es6-promise
//  Promise 是一个类 接受一个executor 执行器，立即执行
//  内部提供两个方法 可以更改promise的状态resolve ，reject ，promise有3中状态，等待态，成功态，失败态
//  resolve触发成功（成功的内容） ，reject触发失败（失败的原因） 默认为undefined
// promise一旦成功了就不能失败，失败的情况（reject，抛出异常）

// 实例（可以叫thenable对象）有一个then方法，promise是为了解决异步问题，

const Promise = require('../../util/promise')


const promise = new Promise((resolve, reject) => {
  // throw new Error('错误')
  // console.log('立即执行')
  setTimeout(() => {
    reject('999')
    // resolve('value')
  }, 1000)
  // resolve('hello,world')
  // reject('reason')
})


promise.then((data) => { // onfulfilled 成功
  console.log('成功的回调----->', data)
}, (reason) => { //  onrejected 失败
  console.log('失败的回调----->', reason)
})

// 支持一个promise可以then多次

promise.then((data) => { // onfulfilled 成功
  console.log('成功的回调1111----->', data)
}, (reason) => { //  onrejected 失败
  console.log('失败的回调1111----->', reason)
})
