/**
 * Promise.all 返回一个promise实例， 让所有promise并发执行，根据执行的个数判断是否执行完成
 * 接收一个数组作为参数，参数可以是promise的实例，也可以是普通值，普通值则直接调用Promise.resolve进行封装
 * 所有promise成功则成功，一个失败则为失败
 */

let { promisify } = require('util')

let fs = require('fs')
let read = promisify(fs.readFile)
function isPromise(value){
    if((typeof value === 'object' && value !==null) ||  typeof value === 'function'){
        if(typeof value.then === 'function'){
            return true
        }
    }
    return false
}
Promise.all = function(promises){
    return new Promise((resolve, reject)=>{
        let arr = []
        let idx = 0
        function pushValue(value, key){
            arr[key] = value
            if(++idx === promises.length){
                resolve(arr)
            }
        }
        for(let i=0; i<promises.length; i++){
            let currentValue = promises[i]
            if(isPromise(currentValue)){  //  判断当前是不是一个promise
                currentValue.then((x)=>{
                    pushValue(x, i)
                }, reject)  // 如果有一个失败立即失败
            }else{
                pushValue(currentValue, i)
            }
        }
    })
}

Promise.race = function(promises){
    return new Promise((resolve, reject)=>{
        for(let i=0; i<promises.length; i++){
            let currentValue = promises[i]
            if(isPromise(currentValue)){  //  判断当前是不是一个promise
                currentValue.then((x)=>{
                    resolve(x)
                }, reject)  // 如果有一个失败立即失败
            }else{
                resolve(currentValue)
            }
        }
    })
}

Promise.race([read('./name.txt','utf8') , read('./age.txt', 'utf8')]).then(data=>{
    console.log(data, 'o0000')
}).catch(err=>{
    console.log(err)
})