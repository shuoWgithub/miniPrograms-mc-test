const Promise = require('../utils/bluebird')

function request (method = 'GET') {
  return function (url, data = {}) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url,
        data,
        method,
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var statusCode = res.statusCode
          var errMsg = res.errMsg
          var data = res.data
          if (statusCode == 200) {
            //todo
            // resolve(data.response)
            resolve(data)
          } else {
            reject('网路请求错误，请稍后再试~')
          }
        },
        fail: function (err) {
          reject('网路请求不符合规范，请检查域名是否符合要求~' + err)
        }
      })
    })
  }
}

export const GET = request('GET')
export const POST = request('POST')
export const PUT = request('PUT')
export const DELETE = request('DELETE')
