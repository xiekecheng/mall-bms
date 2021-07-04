const express = require('express');
const router = express()
const path = require('path');
const svgCaptcha = require('svg-captcha');
const adminModel = require('../models/adminModel')
const bcrypt = require('bcryptjs');



// router.use('/',indexRouter)
router.get('/',(req,res)=>{
    // console.log('__dirname',__dirname);
    // 创建验证码
    let captcha = svgCaptcha.create()
    // 存储验证码在session中
    // console.log(captcha.text);
    req.session['captcha'] = captcha.text
    res.render('login',{
        captcha:captcha.data
    })
})

router.post('/',async(req,res)=>{
    // 验证数据
    // console.log(req.body);
    let sessionCaptcha = req.session['captcha'];
   
    // 获取post提交的数据
    let username = req.body.username
    let password = req.body.password
    let postCaptcha = req.body.captcha
    if(postCaptcha.toLowerCase()!==sessionCaptcha.toLowerCase()){
        res.render('redirect',{
            message:'验证码错误',
            url:'/login',
            num:3
        })
        return;
    }
    let result = await adminModel.findOne({username:username})
    if(!result){
        res.render('redirect',{
            message:'账号不存在',
            num:3,
            url:'/login'
        })
        return;
    }
    if(!bcrypt.compareSync(password,result.password)){
        res.render('redirect',{
            message:'用户名或密码错误',
            num:3,
            url:'/login'
        })
        
    }else{
        // 设置cookie
        res.cookie('username',username,{
            maxAge:60*60*1000
        })
        res.render('redirect',{
            message:'登录成功',
            num:3,
            url:'/'
        })
    }

})



module.exports = router