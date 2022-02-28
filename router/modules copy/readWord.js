const { request } = require('../../utils/request')
const { systemLogger, logger } = require('../../logs');
const axios = require('../../utils/axios');
const { assign } = require('markdown-it/lib/common/utils');




// let readWord = function (ctx, next) {
//   return new Promise(function (resolve, reject) {
//     try {
//       var url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=0Y2PmbBzyhfNZbM1LpDc1jBw&client_secret=OfOKVTpvfR7NwmoKkUXceuLG2vtIPp0x";
//       axios.get(url).then(json => { const _token = json.data.access_token; return _token; })
//         .then(token => {
//           console.log("ctx.request.body.image", ctx.request.body.image)
//           var urls = "https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=" + token;
//           axios.request({
//             url: urls, method: 'post',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             data: { image: ctx.request.body.image },
//             transformRequest: [function (data) { let ret = ''; for (let it in data) { ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&' } return ret }],
//           }).then(res => {
//             console.log('res', res)
//             let data = res.data;
//             let words = "";
//             if (data && data.words_result) {
//               for (let w of data.words_result) { words += w.words }
//             }
//             words = words.replace(/\s*/g, "");
//             var json = { code: '200', data: { words }, msg: 'success' }
//             resolve(json)
//           })
//         })
//     } catch (error) {
//       reject(error)
//       systemLogger.error(error)
//     }
//   })
// }




const getData = function (url) {
  return new Promise((resolve, reject) => {
    var url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=0Y2PmbBzyhfNZbM1LpDc1jBw&client_secret=OfOKVTpvfR7NwmoKkUXceuLG2vtIPp0x";
    axios.get(url).then(json => { const _token = json.data.access_token; return _token; })
      .then(token => {
        resolve(token)
      })

  });
}



// 读取图片转成文字服务
request.post('/api/readWord').then(async (ctx, next) => {



  let asyncFn = async () => {
    var url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=0Y2PmbBzyhfNZbM1LpDc1jBw&client_secret=OfOKVTpvfR7NwmoKkUXceuLG2vtIPp0x";
    let data = null;
    data = await getData(url);
    console.log("data", data)
    return data
  }

  console.log('asyncFn', asyncFn)

  let a = await asyncFn()
  console.log('a', a)
  ctx.body = "a"




  // ctx.body = JSON.stringify(json)



  // let data = result
  // data.then(res => {
  //   console.log("res", res)

  //   ctx.body = "{a:3}"
  // })

  // ctx.body = JSON.stringify(json)


})









