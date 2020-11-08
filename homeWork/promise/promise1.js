
let Promise  = require('./promise.js')
let promise = new Promise((resolev, reject) =>{
     resolev('hello world')
    // 2) 存在异步逻辑
    // setTimeout(()=>{
    //     reject('aaaaa')
    // },1000)
    //  3) 实现then方法的链式调用
})

let promise2 = promise.then((data)=>{
    // throw Error('cuocuocucocuo')
    return data   //  return一个普通值可以作为下次then成功的值
}).finally(()=>{
    console.log('finally')
})

// promise2.then().then().then().then(data=>{
//     console.log(data,'-=-=-=')
// })

// promise2.then((data)=>{
//     console.log(data,'data')
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             reject('10000')
//         },1000)
//     })
// },(e)=>{
//     console.log(e, 'eee')
// }).then((data)=>{
//     console.log('resolve', data)
// },(err)=>{
//     console.log('rerrrrr', err)
//     return 'hahahhahah'
// }).then(data=>{
//     return new Promise((resolev, reject)=>{
//         setTimeout(()=>{
//             resolev(new Promise((resolev, reject)=>{
//                 setTimeout(()=>{
//                     resolev('resolveresolveresolveresolve')
//                 },1000)
//             }))
//         })
//     })
// }).then((data)=>{
//     console.log(data)
// })



// .then((data)=>{
//     console.log(data,'0')
//     return new Promise((resolev, reject)=>{  // 如果返回一个promise，则等promise的结果返回下一个then
//         setTimeout(()=>{
//             reject('resonve')    // 如果是成功则进下一个then成功地回调，如果是失败作为失败的回调的参数
//         }, 1000)
//     })
// }).then((data)=>{
//     console.log(data, '-0987')
// },(err)=>{
//     console.log(err,'-09')  //  相当与return undefined 相当于普通值，还会走到下一个then的成功的回调
// }).then((data)=>{
//     console.log(data) 
//     throw Error('错误')
// }).then(()=>{},(err)=>{
//     console.log(err)
// })


