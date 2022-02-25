
const { systemLogger, logger } = require('../logs');
const router = require('koa-router')()
const request = {
  post: (url) => {
    return new Promise(function (resolve, reject) {
      try {
        router.post(url, async (ctx, next) => {
          ctx.set('Content-Type', 'text/plain')
          ctx.set("Access-Control-Allow-Origin", '*');
          logger.info('request.body:', ctx.request.body)
          resolve(ctx, next)

        })
      } catch (err) {
        reject(err)
        systemLogger.error(err)
      }
    });
  },
  get: () => {
    return new Promise(function (resolve, reject) {
      try {
        router.get(url, async (ctx, next) => {
          ctx.set('Content-Type', 'text/plain')
          ctx.set("Access-Control-Allow-Origin", '*');
          logger.info('request.body:', ctx.request.body)
          resolve(ctx, next)
        })
      } catch (err) {
        reject(err)
        systemLogger.error(err)
      }
    });
  }
}
router.routes()
module.exports = { router, request }
