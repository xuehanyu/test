const Promise = require('../../util/promise')
const promise = new Promise((resolve, reject) => { // executor  立即执行,用户传入
  //  在默认等待态的时候可以更新状态
  resolve('hello1111')
})

// 由于resole或者reject已经更改了state的当前状态，所以当调用then方法时，可以根据当前的状态
// 来决定是否走onfulfilled或者onrejected
const promise2 = promise.then((data) => {
    return 100
})

promise2.then((data) => {
  console.log(data, '000')
})

// .catch(err => { //  catch就是then，只是没有成功，只有失败
//   console.log(err, '错误')
// })

// 1、promise实现链式调用基于then方法返回一个新的promise promise2
// 2、promise then方法onfulfilled onrejected 返回一个值x，需要对这个x跑一个判断函数，判断其类型下一个promise的状态
// 3、如果promise then方法中onfulfilled 或者 onrejected 抛异常，promise执行reject失败函数，并将e作为失败的原因，利用try catch
// 4、onFulfilled or onRejected must not be called until the execution context stack contains only platform code. [3.1].
//    onFulfilled 或者 onRejected 必须异步执行，能取到promise的值，可以利用setTimeOf等宏任务，then是异步调用的在一个新的队列
//  promise处理函数，兼容所有的promise，执行流程都一致
// 1） 引用同一对象问题 可能会造成死循环
// 2) 如果x是一个promise 采用它的状态，只有是对象或者函数才可能是promise
// 取 x 的then方法
// 取x.then可能抛出异常，直接走rejected失败
// 判断x的then方法是不是一个函数，如果是调用该then方法，并将this指向x，第一个参数是成功的回调（参数y），第二个参数是失败的回调（参数r）
// 3） 当成一个普通值，直接返回
