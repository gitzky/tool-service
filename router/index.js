const Router = require('koa-router')
let router = new Router()


// 路由
router.use('/api/readWord', async (ctx, next) => {
  console.log('ctx.state', ctx.state)
  var json = { code: '0', data: { a: 1 }, msg: 'success' }
  ctx.body = JSON.stringify(json)
})

try {
  window.oox = function () {
    console.log(a)
  }
} catch (e) {
  systemLogger.error(e)
}

module.exports = router
