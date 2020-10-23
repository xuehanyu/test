let express = require('express')
let app = express()
//  利用中间件，判断源，决定是否向下执行
let whiteList = ['http://localhost:3000']
app.use(function(req, res, next){
    let origin = req.headers.origin
    if(whiteList.includes(origin)){
        // 设置哪个源可以访问我
        res.setHeader('Access-Control-Allow-Origin', origin)
        //  设置允许的设置header 允许哪个头访问我
        res.setHeader('Access-Control-Allow-Headers','name')
        //  设置允许的请求的方法
        res.setHeader('Access-Control-Allow-Methods','PUT')
        // 允许客户端带凭证 cookie
        // * 不能和凭证共用
        res.setHeader('Access-Control-Allow-Credentials', true)
        // 允许前端获取哪个头
        res.setHeader('Access-Control-Expose-Headers', 'name')
        
        if(req.method==='OPTIONS'){
            res.end()  // 如果是options请求可以不做任何处理
            return
        }
    }

    next()
})

app.get('/getData',function(req,res){
    console.log(req.headers,'headers')
    res.setHeader('name','xhy')
    res.end('我想你了～～')
})

app.put('/getData',function(req,res){
    console.log(req.headers,'headers')
    res.setHeader('name','xhy')
    res.end('我又想你了～～')
})



//  中间件， 以当前目录作为静态目录
app.use(express.static(__dirname))
app.listen(4000)