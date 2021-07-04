const express = require('express');
const transport = require('../models/sendMail')
const router = express()
// const path = require('path');
// const svgCaptcha = require('svg-captcha');
const adminModel = require('../models/adminModel')
const bcrypt = require('bcryptjs');


router.get('/',(req,res)=>{
    res.render('forget')
})
router.get('/resetPass',(req,res)=>{
    res.render('resetPass')
})
router.post('/resetPass',async (req,res)=>{
    console.log('req.body',req.body);
    let password = req.body.password
    let repassword = req.body.repassword
    let username = req.query.username
    console.log(username);
    if(password===repassword){
        let result = await adminModel.updateOne(username,{password:bcrypt.hashSync(password)})
        console.log('result',result);
        if(result.n){
            res.render('redirect',{
                message:'重置密码成功',
                num:3,
                url:'/login'
            })
        }else{
            res.render('redirect',{
                message:'重置密码失败',
                num:3,
                url:'/forget/resetPass'
            })
        }

    }else{
        res.render('redirect',{
            message:'两次输入密码不一致,请重新输入',
            num:3,
            url:'/forget/resetPass'
        })
    }
    console.log(res.body);
    res.render('resetPass')
})
router.post('/', async(req,res)=>{
    let username = req.body.username
    let result = await adminModel.find({username});
    let email = result[0].email;
    console.log(email);
    let from = 'xkccoding@qq.com'
    let html =  `
    您好: 你正在重置${username}的密码，确认重置请点击下面的链接：
    <br>
    <a href="http://localhost:3000/forget/resetPass?username=${username}">重置密码</a>
    <br>
    如果你不确定是否要修改，请忽略此邮件！
    ------------------------<br>
    前途无限股份有限公司
    `
    // transport(email,'重置密码',html)

    transport.sendMail({
        from: from,
        to: email,
        subject: '找回密码',
        html: html
    }, (err, info) => {
        if (err) {
            res.render('redirect',{
                message:'邮件发送错误',
                num:3,
                url:'/forget'
            })
        }
        if (err) {
            res.render('redirect',{
                message:'邮件发送成功',
                num:3,
                url:'/forget'
            })
        }
    })

    // res.render('forget')
})
module.exports = router