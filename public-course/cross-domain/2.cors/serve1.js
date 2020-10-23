let express = require('express')
let app = express()
//  中间件， 以当前目录作为静态目录
app.use(express.static(__dirname))

app.listen(3000)