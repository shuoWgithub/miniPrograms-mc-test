const app = getApp()


Page({
  data: {
    title: 'updatePhoto page',
    title: '',
    tabbar: {},
    imgUrl: 'http://image.artful.com.cn/appbanner/64958109_p0_master1200.jpg',
    width: 450,
    height: 475,
    cutImg: ''
  },
  onLoad: function () {
  },
  loadImg: function () { // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:  (res) => {
        this.setData({imgUrl: res.tempFilePaths[0]})
      }
    })
  },
  cut: function () { // 确认修改
    let that = this
    console.log(this)
    const ctx = wx.createCanvasContext('cutImg')
    console.log(ctx)
    ctx.drawImage(that.data.imgUrl, 0, 0, 200, 200)
    ctx.draw()
    wx.canvasToTempFilePath({
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      canvasId: 'cutImg',
      success: (res) => {
        this.setData({cutImg: res.tempFilePath})
        console.log(res)
      }
    })
  }
})