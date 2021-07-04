module.exports = (req,res,next)=>{
    const username = req.cookies.username
    console.log(req.url);
    console.log(req.path);
    if(req.url==='/login'||req.url==='/forget'||req.path==='/forget/resetPass'){
        next()
    }else{
        if(!username){
            res.render('redirect',{
                message:'未登录',
                num:3,
                url:'/login'
            })
        }else{
            next()
        }
    }
    
}