# toolService

提供一些基础工具服务

## 读取文字服务
调用百度的api接口通过上传base64图片识别为文字


### 获取token
#### 请求方式：GET
#### 请求地址：https://aip.baidubce.com/oauth/2.0/token
#### 请求参数：
```js 
{ 
  grant_type: 'client_credentials',
  client_id:'xxxxxx',
  client_secret: 'xxxxxxxxxxx'
}
```

##
### 根据Base64图片调取接口
#### 请求方式：POST
#### 请求地址：https://aip.baidubce.com/rest/2.0/ocr/v1/general
#### 请求头
```js  
headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
```
#### 请求参数：
```js 
// 验权
query :{
  access_token: token //拼到地址栏
}

params:{
  data:image, // 在body中请求
}
// 请求示例：
 axios.request({
    url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=xxx', 
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: { image: params.image },
    transformRequest: [
        function (data) { 
            let ret = ''; 
            for (let it in data) {
                 ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&' 
            } 
            return ret
        }
    ],
})

```
