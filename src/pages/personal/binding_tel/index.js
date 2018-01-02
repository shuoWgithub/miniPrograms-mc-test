// 获取全局应用程序实例对象
const app = getApp()

// wx.showToast({
//   title: '手机号有误',
//   image: app.util.aleat.warning
// })

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userTelNum: '',
    userVerificationCode: '',
    getVerificationText: '获取验证码',
    getVerificationCodeDisabled: false,
    bindTelNumDisabled: false,
    userTelNumCorrect: true
  },
  getVerificationCode: function () {
    var wThis = this
    if (app.util.verification.checkCellphone(this.data.userTelNum)){
      setTimeOut()
    }

    function setTimeOut(success) {
      wThis.setData({getVerificationCodeDisabled: true})
      var allTime = 4
      var verificationsetInterval = setInterval(function () {
        wThis.setData({getVerificationText: '等待' + allTime-- + '秒' })
        if (allTime < 0) {
          clearInterval(verificationsetInterval)
          wThis.setData({getVerificationCodeDisabled: false})
          wThis.setData({getVerificationText: '获取验证码' })
          success()
          return
        }
      }, 1000)
    }

  },
  bindTelNum: function () {
    this.setData({bindTelNumDisabled: true})
  },
  userTelNumInput: function (e) {
    var telCorrect = app.util.verification.checkCellphone(e.detail.value)

    this.setData({
      userTelNum: e.detail.value,
      userTelNumCorrect: telCorrect
    })
  },
  userVerificationCodeInput: function (e) {
    this.setData({
      userVerificationCode: e.detail.value
    })
  }
})
