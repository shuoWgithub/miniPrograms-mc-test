// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      name: '手冢治虫',
      tel: 1123123123,
      avatar: 'http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg'
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {

  },
  toFollow: function (e) {
    var userId = this.data.userInfo.id || 1231232132313
    wx.navigateTo({
      url: "/pages/personal/follow/index?userId=" + userId
    })
  },
  toUpload: function (e) {
      wx.navigateTo({
          url: "/pages/__test_upload/index"
      })
  },
  toInfo: function () {
    var userId = this.data.userInfo.id || 1231232132313
    wx.navigateTo({
      url: "/pages/personal/info/index?userId=" + userId
    })
  },
  toCollection: function () {
    wx.navigateTo({
      url: "/pages/personal/collection/index"
    })
  },
  toOrder: function () {
    wx.navigateTo({
      url: "/pages/order/index/index"
    })
  }
})
