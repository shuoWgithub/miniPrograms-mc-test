// 获取全局应用程序实例对象
const app = getApp()
let col1H = 0;
let col2H = 0;

Page({

  data: {
    uuid: app.util.uuid,
    showArtifact: false,
    artistInfo:{
      intro:'这是一首简单的小情歌唱出我们心中的不舍我想我很适合做一个歌唱者\n这是一首简单的小情歌唱出我们心中的不舍我想我很适合做一个歌唱者这是一首简单的小情歌唱出我\n们心中的不舍我想我很适合做一个歌唱者',
      tag: ['参数', '温泉', '额阿达'],
      name: '手冢治虫',
      focus: 123,
      avatar: 'http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg'
    },

    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []
  },
  onLoad: function () {
    console.log(this.data.artictId)

    //加载瀑布流
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        //加载首组图片
        this.loadImages();
      }
    })
  },

  showArtifactTap: function () {
    this.setData({showArtifact: true});
  },

  onReachBottom: function () {
    this.loadImages()
  },

  //瀑布流
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  imageDate:  [
    { pic: "http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370!960xAuto", height: 0 },
    { pic: "http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg!960xAuto", height: 0 },
    { pic: "http://image.artful.com.cn/artful/other/2017-12-16/6439ac986b55971d!960xAuto", height: 0 },
    { pic: "http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg!960xAuto", height: 0 },

  ],

  loadImages: function () {
    this.imageDate = this.imageDate.concat( [
      { pic: "http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg!960xAuto", height: 0 },
      { pic: "http://image.artful.com.cn/artful/other/2017-12-16/6439ac986b55971d!960xAuto", height: 0 },
      { pic: "http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg!960xAuto", height: 0 },
      { pic: "http://image.artful.com.cn/artful/other/2017-12-16/cf76da9725aade55!960xAuto", height: 0 },
      { pic: "http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370!960xAuto", height: 0 },

    ])
    let images = this.imageDate

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });
  }
})