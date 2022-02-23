const Koa = require('koa')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const router = require('./router/index')

const { accessLogger, systemLogger } = require('./logs');

const app = new Koa()


app.use(accessLogger()); //中间件


app.on('error', err => {
  systemLogger.error(err)
});



// 配置静态资源加载中间件
app.use(static(path.join(__dirname, '/public')))
// 配置请求参数
app.use(
  bodyParser({
    formLimit: '1mb',
  }),
)




app.use(router.routes()).use(router.allowedMethods())


app.listen(8000)
console.log('server runing at 127.0.0.1:8000')


