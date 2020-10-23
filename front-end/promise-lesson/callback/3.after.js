// // 高阶函数，如何应用到我们异步中，
// // 什么是异步， 1）执行后的返回结果不能立马获取，2）如ajax 等待同步代码执行后，才会获取最终结果

// // node中操作文件都是异步的


// let fs=require('fs');// 读写文件
// // 异步的解决方案，最早是基于回调函数的，不能使用try catch ，只能捕获同步错误
// // 为了解决try catch不能捕获，node中回掉函数第一个参数永远是err

// //  基于回调的方式获得最终结果
// function after(times, callback){
//     //  times会保存在当前的执行上下文中
//     let renderObj = {}
//     return function (key,value){
//         renderObj[key] = value
//         if(--times == 0){
//             callback(renderObj)
//         }
//     }
// }

// let out = after(2, function(renderObj){  //  高阶函数
//     console.log(renderObj)
// })

// fs.readFile('./age.txt', 'utf8', function(err, data){
//     // console.log(err)
//     out('age', data)
// })

// fs.readFile('./name.txt', 'utf8', function(err, data){
//     //renderObj['name'] = data
//     out('name', data)
// })


// //  发布订阅 ，所有库中都存在发布订阅
// //  观察者模式，内部基于发布订阅




// ------------------------回顾------------------------

//  高阶函数解决异步调用问题，如，读取文件并将读到的属性存储到对象上，两个文件都读取之后打印该对象

const fs = require('fs')
let obj = {}
let countNum = 0;
function count(){
    countNum ++ 
    if(countNum ===2){
        console.log(obj)
    }
}


function after(times, callback){
    let obj  = {}
    return function(key, value){
        obj[key] = value
        if(--times ===0){
            callback(obj)
        }
    }
}


const out = after(2,function(obj){
    console.log(obj)
})

fs.readFile('./name.txt', 'utf8', function(err, data){
    // 读取成功之后需要发布出去
    out('name', data)
    // obj.name = data
    // count()
})

fs.readFile('./age.txt', 'utf8', function(err, data){
    out('age', data)

    // 读取成功之后需要发布出去
    // obj.age = data
    // count()
})