const axios = require('axios');
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var server = http.createServer();
server.on('request', function (req, res) {
  res.statusCode = 200; res.setHeader('Content-Type', 'text/plain');
  res.setHeader("Access-Control-Allow-Origin", '*');
  var postData = '';
  req.on('data', function (chuck) { postData += chuck; });
  req.on('end', function () {
    var url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=0Y2PmbBzyhfNZbM1LpDc1jBw&client_secret=OfOKVTpvfR7NwmoKkUXceuLG2vtIPp0x";
    let imgObj = JSON.parse(postData);
    axios.get(url).then(json => { const _token = json.data.access_token; return _token; })
      .then(token => {
        var urls = "https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=" + token;
        axios.request({
          url: urls, method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data: { image: imgObj.image },
          transformRequest: [function (data) { let ret = ''; for (let it in data) { ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&' } return ret }],
        }).then(json => {
          let data = json.data;
          let words = "";
          if (data && data.words_result) {
            for (let w of data.words_result) { words += w.words }
          } words = words.replace(/\s*/g, "");
          words && console.log('文字识别成功：' + words) || console.log('文字识别失败');
          res.end(words)
        })
      })
  })
}); server.listen(8888, function () { console.log('识别文字服务启用成功') });