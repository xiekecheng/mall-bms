const express = require('express');
const router = express()
// const path = require('path');
// const svgCaptcha = require('svg-captcha');
// const adminModel = require('../models/adminModel')
// const bcrypt = require('bcryptjs');


router.get('/',(req,res)=>{
    res.render('forget')
})


module.exports = router