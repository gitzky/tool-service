const Router = require('koa-router')
let router = new Router()


// 路由
router.use('/api/readWord', async (ctx, next) => {
  console.log('ctx.state', ctx.state)
  var json = { code: '0', data: { a: 1 }, msg: 'success' }
  ctx.body = JSON.stringify(json)
})
module.exports = router
