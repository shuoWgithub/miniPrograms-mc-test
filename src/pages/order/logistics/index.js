// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uuid: app.util.uuid,
    list: [1,2,4,5,6]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {

  }
})
