// promise可以解决链式调用问题 .then.then

const promise = new Promise((resolve, reject) => {
  resolve('hello') // 普通值意味不是一个promise
})

promise.then(data => {
  console.log(data,'000')
  return data //  then方法中可以返回一个值（不是promise），会把这个结果放到下次then的成功回调中
}).then(data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { //  如果返回一个promise，那么会采用这个promise的结果
      resolve('world')
    }, 1000)
  })
}).then(data => {
  return new Promise((resolve, reject) => { //  如果返回一个promise，那么会采用这个promise的结果
    setTimeout(() => {
      reject('失败')
    }, 1000)
  })
}).then(() => {}).then(data => {
  // console.log(data,'data')
  throw new Error('跑错')
}).then(() => {}).catch(err => { //  捕获错误，先找距离自己最近的如果没有错误捕获，会找到最终的catch
  console.log('catch') //  同意处理错误，可以把catch看成then
}).then(data => {
  console.log(data, '-=098765')
})

//  什么时候走成功  then中返回的是一个普通值，或者是一个promise的时候（成功的promise）
//  失败的情况  返回的是一个失败的promise 、或者是抛出一个异常
//  catch的特点是如果都没有错误处理（一层一层找）没有找到错误处理，会找最近的catch,catch也是then ，遵循then的规则
// .then.then 并不是和jquery一样，返回this，而是每次都返回一个全新的promise
