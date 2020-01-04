let express = require('express')

let app = express()

app.get('/',function (req,res) {
    res.send('hello,wo')
})


app.listen('3000',function () {
    console.log('服务器启动成功')
})