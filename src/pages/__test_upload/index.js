import { POST } from '../../libs/request.js'


// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Index page2w',
    userInfo: {},
    uuid: app.util.uuid(),

    j: 1,//帧动画初始图片
    isSpeaking: false,//是否正在说话
    voices: [],//音频数组
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    console.log(' ---------- onLoad ----------')

    // app.getUserInfo()
    //   .then(info => {
    //     this.setData({ userInfo: info })
    //   })
    //   .catch(console.info)


    // let url = `https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18317095413`;
    // GET(url).then(function (res) {
    //   console.log(res)
    // }, function (err) {
    //   console.log(err)
    // }).catch(function (err) {
    //   console.error(err)
    // })

  },
  //手指按下
  touchdown: function () {
    console.log("手指按下了...")
    console.log("new date : " + new Date)
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    //开始录音
    wx.startRecord({
      success: function (res) {
        //临时路径,下次进入小程序时无法正常使用
        var tempFilePath = res.tempFilePath
        console.log("tempFilePath: " + tempFilePath)
        //持久保存
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function (res) {
            //持久路径
            //本地文件存储的大小限制为 100M
            var savedFilePath = res.savedFilePath
            console.log("savedFilePath: " + savedFilePath)
          }
        })
        wx.showToast({
          title: '恭喜!录音成功',
          icon: 'success',
          duration: 1000
        })
        //获取录音音频列表
        wx.getSavedFileList({
          success: function (res) {
            var voices = [];
            for (var i = 0; i < res.fileList.length; i++) {
              //格式化时间
              var createTime = new Date(res.fileList[i].createTime)
              //将音频大小B转为KB
              var size = (res.fileList[i].size / 1024).toFixed(2);
              var voice = { filePath: res.fileList[i].filePath, createTime: createTime, size: size };
              console.log("文件路径: " + res.fileList[i].filePath)
              console.log("文件时间: " + createTime)
              console.log("文件大小: " + size)
              voices = voices.concat(voice);

              var file = res.fileList[i].filePath

            }
            _this.setData({
              voices: voices
            })
          }
        })
      },
      fail: function (res) {
        //录音失败
        wx.showModal({
          title: '提示',
          content: '录音的姿势不对!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return
            }
          }
        })
      }
    })
  },
  //手指抬起
  touchup: function () {
    console.log("手指抬起了...")
    this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer)
    wx.stopRecord()
  },
  //点击播放录音
  gotoPlay: function (e) {
    var filePath = e.currentTarget.dataset.path
    //点击开始播放
    wx.showToast({
      title: '开始播放',
      icon: 'success',
      duration: 1000
    })
    wx.playVoice({
      filePath: filePath,
      success: function () {
        wx.showToast({
          title: '播放结束',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  uploadUpyun: function (e) {
    var that = this
    var index = parseInt(e.currentTarget.id);
    var filePath = e.currentTarget.dataset.path;
    uploadRecord(filePath, index, that)
  }
})

//麦克风帧动画
function speaking() {
  var _this = this;
  //话筒帧动画
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}



function uploadRecord(file, index, that) {

  wx.uploadFile({
    url: 'https://v0.api.upyun.com/artful', //仅为示例，非真实的接口地址
    filePath: file,
    name: 'file',
    formData: {
      'policy': 'eyJidWNrZXQiOiJhcnRmdWwiLCJleHBpcmF0aW9uIjoxNTE2ODc5MzQ3LCJzYXZlLWtleSI6Ii9teUNhbnZhc1VweXVuVXBsb2FkL2F2YXRhci97eWVhcn0ve21vbn0ve2RheX0vdXBsb2FkX3tyYW5kb20zMn17LnN1ZmZpeH0iLCJkYXRlIjoiVGh1LCAyNSBKYW4gMjAxOCAxMDo1MjoyNyBHTVQifQ==',
      'authorization': 'UPYUN wangshuo:AVLwwGeauHf7hOj+cCuKXZkcEvU='
    },
    success: function (res) {
      var data = res.data
      var obj = JSON.parse(data);

      var up = "voices[" + index + "].url";
      that.setData({ [up]: 'http://image.artful.com.cn' + obj.url})

      wx.showToast({
        title: '路径:' + obj.url,
        icon: 'success',
        duration: 1000
      })
    },
    fail: function (msg) {
      wx.showToast({
        title: msg,
        image: app.util.aleat.warning
      })
    }
  })
}

//
// function getToken(pathFile) {
//   //设置存储路径
//   var path = pathFile || ''
//   //修改的参数
//   //#################################################################################################
//   var bucket = 'artful';//又拍云的服务名
//   var operator = 'wangshuo'; //授权的操作员
//   var password = '043aa421bce9ea657ad8a97f12c086c6'; // 授权的操作员密码
//   //#################################################################################################
//   var GMTdate = new Date()
//   var UTC = Date.UTC(GMTdate.getUTCFullYear(), GMTdate.getUTCMonth(), GMTdate.getUTCDate(), GMTdate.getUTCHours(), GMTdate.getUTCMinutes(), GMTdate.getUTCSeconds());
//
//   var method = 'POST';
//   var URI = '/' + bucket;
//   var options = {};
//   options['bucket'] = bucket;
//   options['expiration'] = UTC / 1000 + 1800;
//   options['save-key'] = '/myCanvasUpyunUpload' + path + '/{year}/{mon}/{day}/upload_{random32}{.suffix}';//save-key 详细说明可以看官方文档
//   options['date'] = GMTdate.toGMTString();
//
//   var policy = new Buffer(JSON.stringify(options)).toString('base64');//policy 生成
//
//   var str = method + '&' + URI + '&' + GMTdate.toGMTString() + '&' + policy;
//
//   var signature = CryptoJS.HmacSHA1('sha1', password).update(str).digest().toString('base64');
//
//   var authorization = "UPYUN " + operator + ":" + signature;
//   console.log(policy)
//   console.log(signature)
//   var upyun = {
//     authorization: authorization,
//     signature: signature,
//     policy: policy,
//     expiration: options.expiration,
//     date: options.date,
//     saveKey: options['save-key']
//   }
//
//   return upyun
//
// }


