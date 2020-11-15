// 当用户登录后，返回一个标识 cookie

let express = require('express')
let path = require('path')  // 拼接路径

let app = express()

app.use(express.static(path.join(__dirname, 'public')))   // 利用中间件
app.use(express.static(path.join(__dirname)))

let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
app.use(cookieParser())  // req.cookies 就可以取到
app.use(bodyParser.urlencoded({ extended: true })) // 告诉中间件 将jq传过来的参数a=1&b=2这样的形式转换成 {a:1,b:2} = req.body

let userList = [{ username: 'zfpx', password: 'zfpx',money:'10000' }, { username: 'jack', password: '123',money:'100' }]
let SESSION_ID = 'connect.sid'
let session = {}
app.post('/api/login', function (req, res) {
    //  我们想直接通过req.body.username 这样去解析前端传过来的参数，利用bodyParser中间件
    let { username, password } = req.body
    let user = userList.find(user => (user.username === username) && (user.password === password))
    if (user) {
        // 服务器需要在用户登录后，给一个信息，类似于 name : value的形式
        let cardId = Math.random() + Date.now()
        session[cardId] = { user }
        res.cookie(SESSION_ID, cardId, { httpOnly: false })
        res.json({ code: 0 })
    } else {
        res.json({ code: 1, error: '该用户不存在' })
    }
    console.log(username, password)
})

// 1）！！！s反射型 xss http://localhost:3000/welcome?type=%3Cscript%3Ealert(document.cookie)%3C/script%3E chrome发现异常会哟欧xss屏蔽功能

// 一般情况下会让cookie在前端不可获取，并不是解决xss 的方案， 只是降低受损的范围  { httpOnly: false }
// 诱导用户自己点开（一次性）
// 查询参数， 可以加上 encodeURIComponent 方式解决

app.get('/welcome', function (req, res) {
    res.send(`${encodeURIComponent(req.query.type)}`)
})


//持久化攻击 ！！！！用户评论信息
let comments = [{ username: 'zfpe', content: "欢迎欢迎" }, { username: 'jack', content: "哈哈哈哈哈" }]

app.get('/api/list', function (req, res) {
    res.json({ code: 0, comments })
})

app.post('/api/addcomment', function(req,res){
    let { content } = req.body
    //  当访问添加留言时，执行到这，
   let r =  session[req.cookies[SESSION_ID]] || {}
   if(r.user){
       comments.push({ username: r.user.username, content })
        res.json({code:0})
   } else{
       res.json({code:1, error:'用户未登录'})
   }
})

app.get('/api/userinfo', function(req, res){
   let r =  session[req.cookies[SESSION_ID]] || {}
   if(r.user){
        res.json({code:0, user: r.user})
   } else{
       res.json({code:1, error:'用户未登录'})
   }

})


app.post('/api/transfer', function(req, res){
    let r =  session[req.cookies[SESSION_ID]] || {}
    if(r.user){
        let {target, money} =req.body
        money = Number(money)
        userList.forEach(u =>{
           if( u.username === r.user.username){
                u.money -= money
           }
           if(u.username = target){
               u.money +=money
           }
        })
        res.json({code:0})
    } else{
        res.json({code:1, error:'用户未登录'})
    }
})

//3）！！！！  xss 存储型，恶意的脚本存储到服务器上，所有人访问时都会造成攻击，比发射型和DOM-Base 范围更大
app.listen(3000)


// 跨站请求伪造，，钓鱼网站