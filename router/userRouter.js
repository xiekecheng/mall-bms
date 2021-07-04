const express = require('express');
const router = express()
const adminModel = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const moment = require('moment');
// const adminModel = require('../models/adminModel');

// router.use('/',indexRouter)
router.get('/list',async(req,res)=>{
    
    // 获取数据总数
    let count = await adminModel.countDocuments({});
    console.log(count);
    // 定义每页显示条数
    let pageSize =3
    // 总页数
    let totalPage = Math.ceil(count/pageSize)
    // 获取?问号传递参数
    console.log('req.query',req.query.page);
    let page = req.query.page;
    // 当前页
    let currentPage = page?page:1;
    let skip = (currentPage-1)*3
    let list = await adminModel.find({},{},{skip,limit:pageSize});
    console.log('totalPage',totalPage);
    // console.log(list);
    res.render('showList',{
        list,
        totalPage,
        currentPage,
        count

    })
})
router.get('/add',async(req,res)=>{
    // let result = await adminModel.find();
    // console.log(result);
    res.render('add',{
        // list:result
    })
})
router.get('/update/:username',async(req,res)=>{
    // console.log('req.params.username',req.params.username);
    let username = req.params.username
    let result = await adminModel.find({username:username})
    // let result2 = await adminModel.updateOne({username:username},{$set:{}})
    console.log('result',result);
    res.render('update',{
        result:result[0]
        // list:result
    })
})
router.get('/delete/:username',async(req,res)=>{
    // console.log('req.params.username',req.params.username);
    let username = req.params.username
    let result = await adminModel.deleteOne({username})
    // let result2 = await adminModel.updateOne({username:username},{$set:{}})
    console.log('result',result);
    if(result.n){
        res.render('redirect',{
            message:'删除成功',
            num:3,
            url:'/user/list'
            // list:result
        })
    }

})

router.post('/updateHandler',async(req,res)=>{
    console.log('req.body',req.body);
    // let username = req.body.username
    // let password = bcrypt.hashSync(req.body.password)
    let username = req.body.username
    console.log('username',username);
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    if(password===confirmPassword){
        // let result = await adminModel.updateOne({username:username},{$set:{password:password}})

        // let result = await adminModel.find({username:username})
        let result = await adminModel.updateOne({
            username:username
        },{$set:{
            // username:req.body.username,
            password:bcrypt.hashSync(password),
            update_time:moment().format("YYYY-MM-DD HH:mm:ss")
        }})
        if(result.n){
            res.render('redirect',{
                message:'修改成功',
                num:3,
                url:'/user/list'
            })
        }else{
            res.render('redirect',{
                message:'修改失败',
                num:3,
                url:'/user/update'+username
            })
        }
        console.log('result',result);
    }else{
        res.render('redirect',{
            message:'两次输入的密码不一致',
            num:3,
            url:'/user/update'
        })
    }
    
    // res.render('update',{
    //     result:result
    //     // list:result
    // })
})


router.post('/addUserHandler',async(req,res)=>{
    console.log(req.body);
    // res.render('add',{
    //     // list:result
    // })
    let date = moment().format('YYYY-MM-DD HH:mm:ss')
    let username = req.body.username
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    if(password!==confirmPassword){
        res.render('redirect',{
            message:'两次输入的密码不一致',
            num:3,
            url:'/user/add'
        })
        return
    }
    let result = await adminModel.insertMany({
        username:username,
        password:bcrypt.hashSync(password),
        create_time:date,
        update_time:date
    })
    console.log(result);
    if(result.length){
        res.render('redirect',{
            message:'添加用户成功',
            num:3,
            url:'/user/list'
        })
        
    }else{
        res.render('redirect',{
            message:'添加用户失败',
            num:3,
            url:'/user/add'
        })
    }
})
module.exports = router