'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Promise = require('../utils/bluebird');

function request() {
  var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';

  return function (url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: data,
        method: method,
        header: {
          'Content-Type': 'application/json'
        },
        success: function success(res) {
          var statusCode = res.statusCode;
          var errMsg = res.errMsg;
          var data = res.data;
          if (statusCode == 200) {
            //todo
            // resolve(data.response)
            resolve(data);
          } else {
            reject('网路请求错误，请稍后再试~');
          }
        },
        fail: function fail(err) {
          reject('网路请求不符合规范，请检查域名是否符合要求~' + err);
        }
      });
    });
  };
}

var GET = exports.GET = request('GET');
var POST = exports.POST = request('POST');
var PUT = exports.PUT = request('PUT');
var DELETE = exports.DELETE = request('DELETE');
//# sourceMappingURL=request.js.map
