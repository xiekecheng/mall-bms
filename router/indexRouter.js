const express = require('express');
const router = express()

// router.use('/',indexRouter)
router.get('/',(req,res)=>{
    res.render('index')
})


module.exports = router