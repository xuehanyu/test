/*基本用法：
 * 1) Promise 可能是一个对象或者函数，存在then方法，
 * 2）接收一个执行器函数，当new Promise时，立即执行
 * 3）一个有三种状态，pending（待定），resolve（成功的）， reject（失败的）
 * 4）   抛出一个err、调用reject都可以使promise等待态转为失败态；调用resolve，才可以使等待态转变成功态
 * 5）状态一旦确定，则不可以改变，成功有成功的value，默认为undifined， 失败有失败的原因reason，默认也是undifined
 */
const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
 
function promiseResolutonProcedure(promise2, x,resolve, reject){
    //  兼容各个平台的代码，有可能引入别人的promise
    // 1) 解决循环引用问题，容易造成死循环
    if(promise2 === x) {
        return reject(new TypeError(' Chaining cycle detected for promise #<Promise>---')) 
    }
    let called
    if(typeof x === 'object' && x!==null || typeof x ==='function'){  //是一个对象或者函数
        //  因为then方法 可能使用getter来定义的，别人写的可能会抛出异常，所以需要try / catch
        try{
            let then = x.then
            if(typeof then === 'function'){
        
                    then.call(x,y=>{
                        if(called) return
                        called = true
                        //如果返回仍然是一个promise 递归调用
                        promiseResolutonProcedure(promise2, y, resolve, reject)
                    }, r => {
                        if(called) return
                        called = true
                        reject(r)
                    } )
            }else{   // 如果是一个对象
                resolve(x)
            }  
        }catch (error){
            if(called) return
            called = true
            reject(error)
        }
        
    } else {
        resolve(x)
    }

}

class Promise{
    constructor(excutor){
        this.state = PENDING //  默认等待态
        this.value = undefined  // 成功的数据默认为undefined
        this.reason = undefined  //  失败的原因默认也是undifined
        this.onFulfilledCallbacks = []  // 用于存成功的回调
        this.onRejectedCallbacks = []  // 用于存失败的回调
        let resolve = (value)=>{   // 此方法和reject方法是内部方法，改变状态的，不是实例方法
            if(value instanceof Promise){   // resolve的也可能是promise，  递归解析 直到是普通值为止
                value.then(resolve, reject)
                return
            }

            if(this.state === PENDING ){
                this.value = value 
                this.state = RESOLVED
                this.onFulfilledCallbacks.forEach(fn=> fn(this.value))
            }
        }
        let reject = (reason)=>{   // 此方法和reject方法是内部方法，不是实例方法
            if(this.state = PENDING){
                this.reason = reason
                this.state = REJECTED
                this.onRejectedCallbacks.forEach(fn=> fn(this.reason))
            }  
        }
        try {
            excutor(resolve, reject)  // 立即执行,有可能抛出异常，则手动帮忙调用reject，捕获的异常当错误的原因  
        } catch (error) {
            reject(error)
        }

    }

    /**
     *then 方法 有两个参数， 成功的回调onFulfilled、失败的回调，可选的
     *如果内部存在异步逻辑，当调用then方法时，其状态还是pending状态，此时利用发布订阅
     * then 可以链式调用，返回一个全新的promise实例
     */
    finally(callback){
        let P =  this.constructor  // Promise这个类
        return this.then(
            value => P.resolve(callback()).then(()=> value),
            reason => P.resolve(callback()).then(()=>{throw reason})
        )
    }
    catch(errBack){
       return  this.then(null,errBack)
    }
    then(onFulfilled,  onRejected){  // 实例上有一个then方法
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v=>v
        onRejected = typeof onRejected === 'function' ? onRejected : err=>{throw err}
        let promise2 = new Promise((resolve, reject)=>{
            if(this.state === RESOLVED){
                // 当执行onFulfilled方法时，可能报错
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(this.value)
                        // 这需要执行一个promise的解决函数，来决定是不是一个promise还是普通值
                        promiseResolutonProcedure(promise2, x,resolve, reject )
                    } catch (error) {
                      
                        reject(error)
                    }   
                },0)   
            }
            if(this.state === REJECTED){
                setTimeout(()=>{
                    try {
                        let x = onRejected(this.reason)
                        promiseResolutonProcedure(promise2, x,resolve, reject )
                    } catch (error) {
                        reject(error)
                    }
                },0)
            }
            if(this.state === PENDING){
                this.onFulfilledCallbacks.push(()=>{
                    //  切片编程，增强函数功能
                    setTimeout(()=>{
                        try {
                            let x=  onFulfilled(this.value)
                            promiseResolutonProcedure(promise2, x,resolve, reject )
                        } catch (error) {
                            reject(error)
                        }
                    },0)

                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onRejected(this.reason)
                            promiseResolutonProcedure(promise2, x,resolve, reject )
                        } catch (error) {
                            reject(error)
                        }
                    },0)
                })
            }

        })

        return promise2  
    }

}

// 测试脚本
Promise.defer = Promise.deferred = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd;
}

module.exports = Promise

// jquery 链式调用的原理，返回this
var MyJQ = function(){
}
 MyJQ.prototype = {
     css:function(){
        console.log("设置css样式");
         return this;
     },
    show:function(){
         console.log("将元素显示");
        return this;
     },
    hide:function(){
         console.log("将元素隐藏");
    }
};
 var myjq = new MyJQ();
 myjq.css().css().show().hide();