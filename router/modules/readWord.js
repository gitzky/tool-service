const { request } = require('../../utils/request')

// 读取图片转成文字服务
request.post('/api/readWord').then((ctx, next) => {
  var json = { code: '200', data: {}, msg: 'success' }
  ctx.body = JSON.stringify(json)
})


