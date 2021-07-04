const express = require('express');
const router = express()
const indexRouter = require('../router/indexRouter')
const loginRouter = require('../router/loginRouter')
const userRouter = require('../router/userRouter')
const forgetRouter = require('../router/forgetRouter')

const checkLogin = require('../middleware/checkLogin');
router.use(checkLogin)
router.use('/',indexRouter)
router.use('/login',loginRouter)
router.use('/user',userRouter)
router.use('/forget',forgetRouter)

// router.use('/',indexRouter)


module.exports = router