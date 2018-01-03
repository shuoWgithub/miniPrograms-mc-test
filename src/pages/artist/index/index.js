// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Demo page',
    styleSeries: ['现实分割', '差异风格', '工作风格', '现实分割',  '差异风格', '工作风格', '现实分割', '差异风格', '工作风格'],
    artictList:[
      {
        userId: '111', name: '今敏', avatar: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
        list:[
          {url: 'http://image.artful.com.cn/artful/other/2017-12-25/1a87be94254d4cd8!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/30726fac9c4060d1!960xAuto', id: app.util.uuid()}]
      },
      {
        userId: '111', name: '今敏', avatar: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
        list:[
          {url: 'http://image.artful.com.cn/artful/other/2017-12-25/1a87be94254d4cd8!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/30726fac9c4060d1!960xAuto', id: app.util.uuid()}]
      },
      {
        userId: '111', name: '今敏', avatar: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
        list:[
          {url: 'http://image.artful.com.cn/artful/other/2017-12-25/1a87be94254d4cd8!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/30726fac9c4060d1!960xAuto', id: app.util.uuid()}]
      },
      {
        userId: '111', name: '今敏', avatar: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
        list:[
          {url: 'http://image.artful.com.cn/artful/other/2017-12-25/1a87be94254d4cd8!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/30726fac9c4060d1!960xAuto', id: app.util.uuid()}]
      },
      {
        userId: '111', name: '今敏', avatar: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
        list:[
          {url: 'http://image.artful.com.cn/artful/other/2017-12-25/1a87be94254d4cd8!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto', id: app.util.uuid()},
          {url:  'http://image.artful.com.cn/artful/other/2017-12-22/30726fac9c4060d1!960xAuto', id: app.util.uuid()}]
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {

  },
  onReachBottom: function () {
    this.loadImages()
  },

  toArtistDetial: function (e) {
    var artictId = e.currentTarget.dataset.id || 1231232132313
    wx.navigateTo({
      url: "/pages/artist/artist_detial/index?artictId=" + artictId
    })

  },

  loadImages: function () {
    var artictList = this.data.artictList.concat(this.data.artictList)

    this.setData({
      artictList: artictList
    });
  }

})
