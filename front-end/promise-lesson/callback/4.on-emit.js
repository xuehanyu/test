
// let fs=require('fs');// 读写文件
// // e自定义对象，存在on订阅方法，以及emit发布方法

// let e = {
//     _obj : {},
//     _callbacks :[],//  用于存储用户订阅的回掉函数
//     on(callback){  
//         this._callbacks.push(callback)
//     },
//     emit(key,value){
//         this._obj[key] = value
//         this._callbacks.forEach(fn=>{
//             fn(this._obj)
//         })
//     }
// }

// e.on(function(){   //  每次发布都会出发此函数
//     console.log('订阅成功')
// })

// e.on(function(obj){
//     if(Object.keys(obj).length === 2){
//         console.log(obj)
//     }
// })

// fs.readFile('./age.txt', 'utf8', function(err, data){
//     // 读取完成之后就去发布消息
//     e.emit('age', data)
// })

// fs.readFile('./name.txt', 'utf8', function(err, data){
//   // 读取完成之后就去发布消息
//   e.emit('name', data)
// })

// //  发布订阅 ，所有库中都存在发布订阅，特点是订阅方和发布方没有任何的关系
// //  观察者模式，内部基于发布订阅    有观察者，和被观察者


//  ---------------------------回顾-------------------------
let fs = require('fs')

let e  = {
    _callbacks : [],
    _obj:{},
    on(fn){
        this._callbacks.push(fn)
    },

    emit(key, value){
        this._obj[key] = value
        this._callbacks.forEach(fn=>{
            fn(this._obj)
        })
    }
}

e.on(()=>{
    console.log('订阅成功')
})

e.on((obj)=>{
    if(Object.keys(obj).length === 2){
        console.log(obj)
    }
})

fs.readFile('./name.txt','utf8', function(err, data){
    e.emit('name',data)
})

fs.readFile('./age.txt','utf8', function(err, data){
    e.emit('age',data)
})