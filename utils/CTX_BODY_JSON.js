const { logger } = require('../logs');

const Status = (status) => {
  let message = ''
  let success = true
  switch (status) {
    case 400:
    case '400':
      message = '请求错误(400)'
      success = false
      break
    case 401:
    case '401':
      message = '未授权，请重新登录(401)'
      success = false
      break
    case 403:
    case '403':
      message = '拒绝访问(403)'
      success = false
      break
    case 404:
    case '404':
      message = '请求出错(404)'
      success = false
      break
    case 500:
    case '500':
      message = '服务器错误(500)'
      success = false
      break
    case 501:
    case '501':
      message = '服务未实现(501)'
      success = false
      break
    case 502:
    case '502':
      message = '网络错误(502)'
      success = false
      break
    default:
      message = "请求成功！"
      success = true

  }
  return { success, message }
}


const CTX_BODY_JSON = function (code, data) {
  let msg = Status(code).message
  let success = Status(code).success
  if (success) {
    let res = { code, data, msg, success }
    logger.info(res)
    return res
  } else {
    let resErr = { code, msg, err: data.toString() }
    logger.error(resErr)
    return resErr
  }

}

module.exports = CTX_BODY_JSON


