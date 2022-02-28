


const Router = require('koa-router')
const readWord = require('./modules/readWord')
let router = new Router()


// 路由
router.use('/api/readWord', readWord)






module.exports = router



