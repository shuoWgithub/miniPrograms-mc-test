
// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    order: [
      {
        uuid: app.util.uuid,
        installMaskOpne: false,
        id: 12321312312312123,
        name: '共享空间-风衣享有',
        type: '已确定',
        user: {
          name: '王尼玛',
          tel: '18711111132313'
        },
        artifactList: [
          {
            url: 'http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370'
          },
          {
            url: 'http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370'
          },
          {
            url: 'http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370'
          },
          {
            url: 'http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370'
          }
        ]
      },
      {
        id: 12321312312312123,
        name: '共享空间-风衣享有',
        type: '已确定',
        user: {
          name: '王尼玛',
          tel: '18711111132313'
        },
        artifactList: [
          {
            url: 'http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370'
          },
          {
            url: 'http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370'
          },
          {
            url: 'http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370'
          },
          {
            url: 'http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370'
          }
        ]
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
  },
  openInstallMask: function () {
    this.setData({installMaskOpne: !this.data.installMaskOpne})
  },
  tologistics: function () {
    wx.navigateTo({
      url: "/pages/order/logistics/index"
    })
  }
})
