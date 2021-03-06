/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

var fs = require('fs')
var Student = require('./student')

// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')

// 1. 创建一个路由容器
var router = express.Router()

//2.把路由都挂载到router路由容器中

/*
 * 渲染学生列表页面
 */
router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            students: students
        })
    })
})

/*
 * 渲染添加学生页面
 */
    router.get('/students/new',function (req,res) {
            res.render('new.html')
    })

/*
 * 处理添加学生
 */
router.post('/students/new', function (req, res) {
    // 1. 获取表单数据
    // 2. 处理
    //    将数据保存到 db.json 文件中用以持久化
    // 3. 发送响应
    Student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

/*
 * 渲染编辑学生页面
 */
router.get('/students/edit', function (req, res) {
    // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2. 获取要编辑的学生 id
    //
    // 3. 渲染编辑页面
    //    根据 id 把学生信息查出来
    //    使用模板引擎渲染页面

    Student.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

/*
 * 处理编辑学生
 */
    router.post('/students/edit',function (req,res) {
        //1.获取表单数据
        //2.更新
        //3.发送响应
        Student.updateById(req.body,function (err) {
            if(err){
                return res.status(500).send('Server error.')
            }
            res.redirect('/students')
        })
    })

/*
 * 处理删除学生
 */
    router.get('/students/delete',function (req,res) {
        // 1. 获取要删除的 id
        // 2. 根据 id 执行删除操作
        // 3. 根据操作结果发送响应数据

        Student.deleteById(req.query.id, function (err) {
            if (err) {
                return res.status(500).send('Server error.')
            }
            res.redirect('/students')
        })
    })

    //3.把router导出
    module.exports = router








// module.exports = function (app) {
//     app.get('/students',function (req,res) {
//         //第二个参数是可选的，传入utf-8就是告诉它把读取到的文件直接按照utf-8编码转换
//         fs.readFile('./db.json','utf-8',function (err,data) {
//             if (err){
//                 return res.status(500).send('Server error')
//             }
//             // console.log(data)
//             res.render('index.html',{
//                 //将从文件读取到的数据转换成对象
//                 students:JSON.parse(data).students
//             })
//         })
//
//     })
//
//     app.get('/students/news',function (req,res) {
//
//     })
//
//     app.get('/students/news',function (req,res) {
//
//     })
//
//     app.get('/students/news',function (req,res) {
//
//     })
//
//     app.get('/students/news',function (req,res) {
//
//     })
//
//     app.get('/students/news',function (req,res) {
//
//     })
// }