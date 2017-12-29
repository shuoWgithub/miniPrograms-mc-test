const app = getApp()


Page({
  data: {
    title: 'updatePhoto page',
    title: '',
    tabbar: {},
    imgUrl: ''
  },
  loadImg: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:  (res) => {
        this.setData({imgUrl: res.tempFilePaths[0]})
      }
    })
  }
})