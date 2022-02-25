const Koa = require('koa')
const static = require('koa-static')
const path = require('path')
const router = require('./router/index')
const formidable = require('koa2-formidable');

let bodyParser = require("koa-bodyparser");



const { accessLogger, systemLogger } = require('./logs');

const app = new Koa()

app.use(formidable());

// 设置bodyParser中间件
app.use(bodyParser())



app.use(accessLogger()); //中间件


app.on('error', err => {
  systemLogger.error(err)
});





// 配置静态资源加载中间件
app.use(static(path.join(__dirname, '/public')))


app.use(router.routes()).use(router.allowedMethods())




app.listen(8888)
console.log('server runing at 127.0.0.1:8888')


