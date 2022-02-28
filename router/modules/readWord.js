const router = require('koa-router')()
const axios = require('../../utils/axios');
const SET_REQUEST_HEADER = require('../../utils/SET_REQUEST_HEADER')
const CTX_BODY_JSON = require('../../utils/CTX_BODY_JSON')
const { systemLogger, logger } = require('../../logs');


const GetToken = function () {
  return new Promise((resolve, reject) => {
    var url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=0Y2PmbBzyhfNZbM1LpDc1jBw&client_secret=OfOKVTpvfR7NwmoKkUXceuLG2vtIPp0x";
    axios.get(url).then(json => { const _token = json.data.access_token; return _token })
      .then(token => {
        resolve(token)
      }).catch(err => {
        reject(err)
        console.log("err", err)
        systemLogger.error(err)
      })
  });
}
const ReadWord = function (token, params) {
  return new Promise((resolve, reject) => {
    var urls = "https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=" + token;
    axios.request({
      url: urls, method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: { image: params.image },
      transformRequest: [function (data) { let ret = ''; for (let it in data) { ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&' } return ret }],
    }).then(res => {
      let words = "";
      let data = res.data;
      if (data && data.words_result) {
        for (let w of data.words_result) { words += w.words }
        words = words.replace(/\s*/g, "");
        resolve(words)
      } else {
        throw new Error(data.error_msg)
      }
    }).catch(err => {
      reject(err)
      systemLogger.error(err)
    })
  });
}


router.post("/", async (ctx, next) => {
  let params = ctx.request.body
  logger.info(params)
  try {
    SET_REQUEST_HEADER(ctx)
    let token = await GetToken()
    let words = await ReadWord(token, params)
    ctx.body = CTX_BODY_JSON('200', words)
  } catch (err) {
    ctx.body = CTX_BODY_JSON('500', err)
  }
})


module.exports = router.routes()









