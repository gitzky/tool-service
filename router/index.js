const { router } = require('../utils/request')
require('./modules/readWord')
module.exports = router


// const router = require('koa-router')()

// router.post("/api/readWord", async (ctx, next) => {
//   ctx.set('Content-Type', 'text/plain')
//   ctx.set("Access-Control-Allow-Origin", '*');
//   console.log('ctx', ctx.request.body)
//   var json = { code: '200', data: {}, msg: 'success' }
//   ctx.body = JSON.stringify(json)
// })

// module.exports = router
