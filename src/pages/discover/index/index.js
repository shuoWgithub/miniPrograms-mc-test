// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: [
      {url: 'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534!960xAuto', uuid: app.util.uuid()},
      {url: 'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534!960xAuto', uuid: app.util.uuid()},
      {url: 'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534!960xAuto', uuid: app.util.uuid()},
      {url: 'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534!960xAuto', uuid: app.util.uuid()},
      {url: 'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534!960xAuto', uuid: app.util.uuid()}
    ],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  onLoad: function () {
  },
  toLocation: function () {
    wx.navigateTo({
      url: "/pages/location/index/index"
    })
  }
})
