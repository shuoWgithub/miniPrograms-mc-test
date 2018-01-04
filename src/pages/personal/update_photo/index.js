const app = getApp()


Page({
  data: {
    title: 'updatePhoto page',
    title: '',
    tabbar: {},
    imgUrl: 'http://image.artful.com.cn/appbanner/64958109_p0_master1200.jpg',
    height: wx.getSystemInfoSync().windowWidth,
    canvasWidth: 200,
    cutImgPath: '',
    ctx: null
  },
  onLoad: function () {
  },
  onImageLoad: function (e) {
    let windowWidth = wx.getSystemInfoSync().windowWidth;

    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = windowWidth  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度
    var canvasWidth = imgWidth > imgHeight ? imgHeight : imgWidth
    this.setData({height: imgHeight, canvasWidth: canvasWidth - 2})

    let that = this
    const ctx = wx.createCanvasContext('cutImg')
    that.setData({ctx: ctx})
    var x = (windowWidth -  that.data.canvasWidth)/2
    var y = (that.data.height -  that.data.canvasWidth)/2
    that.data.ctx.drawImage(that.data.imgUrl, -x, -y, windowWidth, that.data.height)
    that.data.ctx.draw()
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
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.canvasWidth,
      height: that.data.canvasWidth,
      canvasId: 'cutImg',
      success: (res) => {
        that.setData({cutImgPath: res.tempFilePath})

      }
    })



  }
})