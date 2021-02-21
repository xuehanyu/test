// generator 生成器  返回一个迭代器对象 
// 普通函数没有暂停功能， generator生成器函数可以



// function * read(){
//     yield 1
//     yield 2
//     yield 3

// }
// let it = read()  // 迭代器对象 包含一个next方法 
// // console.log(it.next())   //  { value, done }

// let done = false
// while(!done){   // 自动迭代
//     let obj = it.next()
//     done = obj.done
//     console.log(obj.value)
// }


// yield可以有返回值

// function * read(){
//     let a  = yield 1
//     console.log(a)
//     let b  = yield 2
//     console.log(b)
//     let c  = yield 3
//     console.log(b)

// }
// let it = read()
// it.next('111')   // 第一次传递参数无效，因为没有上一次的yeild
// it.next('hello')  // next 的参数，作为上一次yeild 的返回值

// it.next('222')



//  generator + promise 
let { promisify } = require('util')

let fs = require('fs')
let read = promisify(fs.readFile)

function * readAge(){
    let content  = yield read('./name.txt', 'utf8')
    let age  = yield read(content, 'utf8')
    return age
}

function co(it){  // 接受一个迭代器对象, 帮我们一次执行生成器，不停的调用next方法，将最终结果返回
    return new Promise((resolve, reject)=>{
        // 异步迭代，不能用for循环，使用next函数
        function next(data){
            let { value, done } = it.next(data)
            if(done){
                resolve(value)
            } else{
                Promise.resolve(value).then(data=>{
                    next(data)
                }, reject)
            }
        }

        next()
    })

}


co(readAge()).then(data=>{
    console.log(data)
})
// it.next().value.then(data=>{  // 使用起来比较麻烦，有一个co库
//     it.next(data).value.then(data=>{
//         let { value: age }= it.next(data)
//         console.log(age)
//     }) 
// })




// generator 是 async 和 await的原理

// async 函数返回的就是一个promise
