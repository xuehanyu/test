const fs = require('fs')

const util = require('util')

const read = util.promisify(fs.readFile)

function isPromise (currentValue) {
  if ((typeof currentValue === 'object' && currentValue !== null) || typeof currentValue === 'function') {
    if (typeof currentValue.then === 'function') {
      return true
    }
  }
  return false
}

//  all 方法最终返回的是一个promise ,所有方法异步执行，特点，有一个失败，则失败，全成功，则成功，按相应顺序返回一个数组
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const arr = []
    let idx = 0
    function processData (value, index) {
      arr[index] = value
      if (++idx === promises.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      const currentValue = promises[i]
      if (isPromise(currentValue)) {
        currentValue.then(data => {
          processData(data, i)
        }, reject)
      } else {
        processData(currentValue, i)
      }
    }
  })
},

Promise.all([1, read('./name.txt', 'utf8'), 2, read('./age.txt', 'utf8'), 9]).then(data => {
  console.log(data, 'data')
}).catch(err => {
  console.log(err, 'err')
})
