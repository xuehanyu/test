//  generator 生成器 生成迭代器， 特点可以暂停
//  普通函数执行时，没有停止功能
// function * read(){
//     yield 1
//     yield 2 
//     yield 3
// }

// let it = read()  // iterator 迭代器中包含一个next方法

// let done = false
// while(!done){
//     let obj = it.next()
//     done = obj.done
//     console.log(obj)
// }
//  {value, done} 碰到yield关键字就停止


//  --------------------
//  yield 有返回值
// function * read(){
//     let a = yield 1
//     console.log(a)
//     let b = yield 2 
//     console.log(b)
//     let c = yield 3
//     console.log(c)
// }

// let it = read()  
// //  next传递参数会给上一次yield的返回值，第一次传递的参数，是无意义的
// it.next()
// it.next('hello') 
// it.next('world') 
// it.next('!!!') 


//  generator + promise  很好的解决异步问题

const util = require('util')
const fs = require('fs')
const read = util.promisify(fs.readFile)
function * readAge(){
   let content =  yield read('./name.txt','utf8')
   let age =  yield read(content, 'utf8')
   return age
}

//  co 
// function co(it){
//     return new Promise((resolve,reject)=>{
//         // 如果是异步 而且重复性 不能使用循环 循环是同步的
//         //  异步重复工作，迭代 -> 回调
//         // 异步迭代 next函数
//         function next(r){
//             let { value, done }  = it.next(r) 
//             if(done){
//                 resolve(value)
//             } else{
//                 Promise.resolve(value).then(data=>{
//                     next(data)
//                 },reject)
//             }
//         }
//         next()
//     })
// }
function co(it){
    return new Promise((resolve, reject)=>{
        function next(r){
            let { value ,done } = it.next(r)
            if(done){
                resolve(value)
            } else {
                Promise.resolve(value).then(r=>{
                    next(r)
                },reject)
            }
        }
        next()
    })
}



co(readAge()).then(data=>{
    console.log(data,'coo')
})
// 依次去执行生成器，不停调用next方法，将最终结果返回



//  再不用co库的前提，自己实现
// let it = readAge()
// let { value,done } = it.next()
// value.then(data=>{
//     let { value } = it.next(data)
//     value.then(v=>{
//         let { value, done } = it.next(v)
//         console.log(value, done)
//     })
// })


//  他编辑的结果就是generator + co
// async function test(){
//     try {
//         let r = await new Promise((resolve, reject)=>{
//             setTimeout(()=>{
//                 resolve('hello')
//             })
//         })
//         console.log(r)
//     } catch (e) {
//         console.log(e,'r')
//     }
// }

// test()




// async + await = generator + co

//  async 返回的就是一个promise await 后面跟的内容会被包装成一个promise