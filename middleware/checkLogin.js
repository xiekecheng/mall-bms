module.exports = (req,res,next)=>{
    const username = req.cookies.username
    if(req.url==='/login'||req.url==='/forget'){
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