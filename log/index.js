
const log4js = require('koa-log4');
const log4jsConf = require('./config.js');



log4js.configure(log4jsConf)




const logger = log4js.koaLogger(log4js.getLogger('success'), { level: 'info' })
const errLogger = log4js.getLogger('errors')


module.exports = { logger, errLogger }