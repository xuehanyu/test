
// 

const PENDING = 'PENDING'
const RESOLVE = 'RESOLVE'
const REJECT = 'REJECT'
// resolvePromise(promise2, x,resolve, reject)
function resolvePromise(promise2, x, resolve, reject){// 判断x的状态，让promise的状态是成功态还是失败态
    //  此方法为了兼容所有的promise（比如我的库中使用了es6的promise）
    if(promise2 === x){
       return reject(new TypeError(' Chaining cycle detected for promise #<Promise>---')) 
    }
    // If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
    let called
    //  判断函数的类型, 只有是对象或者是函数才有可能是promise
    if(typeof x ==='object' && x!==null || typeof x === 'function'){
        //  有可能是promise，判断then 是不是一个方法
        try {
            let then = x.then
            if(typeof then ==='function'){ // then是个函数
                then.call(x, y=>{  // 调用then方法，this指向x，第一个是成功的回调，第二个是失败的回调
                    // resolve(y)
                    //  resolve的结果可能是一个promise，所以需要递归调用，知道是一个普通值为止
                    if(called) return
                    called = true
                    resolvePromise(promise2, y,resolve, reject)
                }, r=>{
                    if(called) return
                    called = true
                    reject(r)
                })
            } else {  //  then是一个对象，{a:'333' , then:1},认为是普通值
                resolve(x)
            }
        } catch (error) { //  取then方法可能抛异常，直接失败
            //  如果取then出错了，在错误中🈶️掉了该promise的成功
            if(called) return
            called = true
            reject(error)
        }
    }else {  //  普通值的情况，直接返回成功
        resolve(x)
    }
}

class Promise {
    constructor(executor){
        this.state = PENDING
        this.value = undefined  // 成功的内容
        this.reason = undefined   // 失败的原因
        this.resolveCallbacks = [] // 用于存放成功的回调
        this.rejectedCallbacks = [] // 用于存放成功的回调
        let resolve = (value) =>{
            // 保证只有状态是等待态的时候，才能更改状态
            if(value instanceof Promise){
                value.then(resolve, reject)
                return
            }
            if(this.state === PENDING){
                this.value = value
                this.state = RESOLVE
                //  成功的方法一次执行
                this.resolveCallbacks.forEach(fn=>{
                    fn(this.value)
                })
            }
        }
        let reject = (reason) =>{
            if(this.state === PENDING){
                this.reason = reason
                this.state = REJECT
                //  成功的方法一次执行
                this.rejectedCallbacks.forEach(fn=>{
                    fn(this.reason)
                })
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            //  如果内部出错，收到调用reject
            reject(error)
        }
       
    }
    //  catch特殊的then方法
    catch(errCallback){
       return this.then(null, errCallback)
    }
    // onfulfilled, onrejected 是可选参数，如果没有传，拿到什么返回什么
    then(onfulfilled, onrejected){
        // 为了实现链式调用，创建一个新的promise，并返回
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v=>v
        onrejected = typeof onrejected === 'function' ? onrejected : err=>{throw err}
        let promise2 = new Promise((resolve, reject)=>{
            if(this.state === RESOLVE){ // 成功的回调
                // 执行then中的方法，可能返回一个普通值或者时promise，所以要判断x的类型
                // 是不是一个promise，如果是promise的化，需要让这个promise执行，并且采用它的状态
                // 作为promise的成功或者失败
                setTimeout(()=>{
                    try {
                        // 当前函数异步执行 
                        // onFulfilled or onRejected must not be called until the execution context stack contains only platform code
                        let x = onfulfilled(this.value)
                        //  直接方promise2 会报错，此时还未定义
                        resolvePromise(promise2, x,resolve, reject)
                    } catch (error) {  // 一旦执行then方法报错，就走到外层then的错误处理中，调用promise2的reject方法
                        reject(error)
                    }
                }, 0)
                
                
            }
            if(this.state === REJECT){// 失败的回调
                setTimeout(()=>{
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x,resolve, reject)
                   } catch (error) {
                        reject(error)
                   }
                },0)
               
            }
            if(this.state === PENDING){   
                //  executor中有异步逻辑， 利用发布订阅模式
                this.resolveCallbacks.push(()=>{
                    // 切片编程，可以在成功之前做一些事情
                    setTimeout(()=>{
                        try {
                            let x=  onfulfilled(this.value)
                            resolvePromise(promise2, x,resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    },0) 
                })
                this.rejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x,resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
        })
        return promise2
    }
}

Promise.defer = Promise.deferred = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd;
}

module.exports = Promise


// npm install -g  promise-aplus-tests