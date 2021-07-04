const nodemailer = require('nodemailer');

// 创建邮件发送器
const transport = nodemailer.createTransport({
    "domains": ["qq.com"],
    "host": "smtp.qq.com",
    "port": 465,
    "secure": true,
    auth: {
        user: 'xkccoding@qq.com',
        pass: 'kgdwslhzoyinbbbf'
    }
})


// 发送邮件
let sentEmail = ( to, subject, html,from='xkccoding@qq.com') => {

    transport.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    }, (err, info) => {
        if (err) {
            console.log('发送错误:' + err);
            return
        }
        console.log('发送成功');
        console.log(info);
    })


}


// transport.sendMail({
//     from:'xkccoding@qq.com',
//     to:'xkccoding@gmail.com',
//     subject:'offer邮件',
//     html:`
//     <h1>Offer<h1>
//     <p>恭喜你入职腾讯111</p>

//     `
// },(err,info)=>{
//     if(err){
//         console.log('发送错误:'+err);
//         return
//     }
//     console.log('发送成功');
//     console.log(info);
// })
module.exports = transport