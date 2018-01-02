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

  updateUserName: function (e) {
      wx.showLoading({
        title: e.detail.value,
        icon: 'loading'
      })
  },

  toBindingTel: function () {
    wx.navigateTo({
      url: "/pages/personal/binding_tel/index"
    })
  }
})
