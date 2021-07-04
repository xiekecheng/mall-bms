const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controllers/controller');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const managerLog = require('./logs/log');

// 日志中间件
app.use(managerLog)
// cookie
app.use(cookieParser())

// 处理post数据中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    name:'sessionId',
    secret:'sadfaskjdf',
    maxAge:20*60*1000
}))
app.use(express.static('public'))

// 配置模板引擎art-template
app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,"views"))
app.set('view engine','html')

// 所有请求交给controller处理
app.use('/',controller)

// 异常处理中间件
app.use((err,req,res,next)=>{
    // 发生错误,响应异常页面
    res.render(__dirname+'/views/err.html')
})


// 页面未找到中间件
app.use((req,res,next)=>{
    // 发生错误,响应异常页面
    res.render(__dirname+'/views/404.html')
})

app.listen(3000,()=>{
    console.log('项目启动于:http://localhost:3000');
})