//1.引包
let express = require('express');


//2.创建服务器应用程序

let app = express();

//公开指定目录
// app.use('/public/',express.static('./public/'))

//当没有第一个参数的时候，则可以通过省略/public的方式访问
app.use(express.static('./public/'))

//当服务器收到get请求/时，执行回调处理函数
app.get('/',function (req,res) {
    res.send('hello expresss')
});

app.get('/about',function (req,res) {
   // res.setHeader('Content-Type','text/palin; charset=utf-8')
    //res.send('关于')
    var arr = [
        {
            name:'小米',
            price:2999
        },
        {
            name:'华为',
            price:3999
        },
        {
            name:'三星',
            price:4999
        },
        {
            name:'苹果',
            price:5999
        }
    ]
    //响应内容只能是二进制数据或者字符串
    //使用JSON格式转换
   // res.write('关于')
    res.send(JSON.stringify(arr))
    ///res.send()

});

app.listen(3000,function () {
    console.log('服务器打开成功')
});