const fs = require('fs');
const moment = require('moment');

module.exports = (req,res,next)=>{
    let ip  = req.ip
    let method = req.method
    let url = req.url
    // let userAgent = req.headers['user-agent']
    // console.log('userAgent',userAgent);
    // console.log(ip);
    let datetime = moment().format('YYYY-MM-DD HH:mm:ss')
    // let str = `${datetime} - ${ip} - ${url} - ${method} - ${userAgent}+ \n\n`
    let str = `${datetime} - ${ip} - ${url} - ${method} - + \n\n`

    const filePath = __dirname+'/manager.log'
    let bool = fs.existsSync(filePath)
    if(bool){
        fs.writeFileSync(filePath,str)
    }else{
        fs.appendFileSync(filePath,str)
    }
    
    next()
}