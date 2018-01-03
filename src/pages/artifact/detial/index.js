// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uuid: app.util.uuid,
    selectArtifact: {
      url:'',
      height: ''
    },
    artifact: {
      isCollection: false,
      list: [
        'http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370',
        'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534',
        'http://image.artful.com.cn/artful/other/2017-12-16/6439ac986b55971d',
        'http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg'
      ],
      name: '张三',
      topic: '哭泣的女人',
      info: '1999年 油画 | 100x100cm',
      price: 200,
      intro: "塞纳河畔左岸的咖啡我手一杯品尝你的美留下唇印的嘴花店玫瑰名字写错谁告白气球风吹到对接微笑在天上飞你说你有点难追想让我知难而退礼物不许挑最贵只要香榭的落叶"
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.setData({'selectArtifact.url': this.data.artifact.list[0]})
  },

  selectArtifactPhoto: function (e) {
    var url = e.currentTarget.dataset.url
    this.setData({'selectArtifact.url': url})
  },

  previewImage: function(e){
    var wThis = this
    wx.previewImage({
      current: wThis.data.selectArtifact.url, // 当前显示图片的http链接
      urls: wThis.data.artifact.list // 需要预览的图片http链接列表
    })
  },

  onImageLoad: function (e) {
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = wx.getSystemInfoSync().windowWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    this.setData({'selectArtifact.height' : imgHeight})
  }
})
