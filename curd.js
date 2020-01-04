/*
* 入口模块
* */


let express = require('express')
let fs = require('fs')
let app = express()
let router = require('./router')
let bodyParser = require('body-parser')

app.use('/node_modules/',express.static('./node_modules'))
app.use('/public/',express.static('./public'))
//配置模板引擎，试图文件默认在views目录中
app.engine('html',require('express-art-template'))

//配置模板引擎body-parser要在路由挂载前配置
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



//把路由容器挂载到app
app.use(router)

app.listen('3000',function () {
    console.log('服务器启动成功')
})

module.exports = app