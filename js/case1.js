let Promise = require('./promise.js')
let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(123)
    },1000)
   
})

p.then((data)=>{
    console.log('data',data)
},(err)=>{
    console.log('err',err)
})

p.then((data)=>{
    console.log('data',data)
},(err)=>{
    console.log('err',err)
})




