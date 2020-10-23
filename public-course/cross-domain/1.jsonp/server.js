let express = require('express')

let app = express()


app.get('/say', function(req,res){
    const { wd, cb } = req.query
    console.log(wd, cb)
    res.end(`${cb}('哈哈哈哈哈哈哈')`)
})

app.listen(3000)