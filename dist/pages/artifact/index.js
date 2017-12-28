'use strict';

var app = getApp();
var col1H = 0;
var col2H = 0;

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uuid: app.util.uuid,
    artCategories: [{
      id: '1',
      title: '油画',
      styleSeries: ['现实分割', '差异风格', '工作风格', '现实分割', '差异风格', '工作风格']
    }, {
      id: '12',
      title: '水彩',
      styleSeries: ['额发分割', '差异风格', '工作风格']
    }, {
      id: '123',
      title: '山水',
      styleSeries: ['窃取实分割', '而且风格', '工作风格']
    }, {
      id: '1234',
      title: '雕塑',
      styleSeries: ['啊实分割', '二维异风格', '恶趣味作风格']
    }, {
      id: '12345',
      title: '雕塑',
      styleSeries: ['啊实分割', '二维异风格', '恶趣味作风格']
    }, {
      id: '1255',
      title: '雕塑',
      styleSeries: ['啊实分割', '二维异风格', '恶趣味作风格']
    }, {
      id: '13',
      title: '雕塑',
      styleSeries: ['啊实分割', '二维异风格', '恶趣味作风格']
    }, {
      id: '14',
      title: '雕塑',
      styleSeries: ['啊实分割', '二维异风格', '恶趣味作风格']
    }],
    selectId: '1234',
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []

  },

  onLoad: function onLoad() {
    var _this = this;

    //加载瀑布流
    wx.getSystemInfo({
      success: function success(res) {
        var ww = res.windowWidth;
        var wh = res.windowHeight;
        var imgWidth = ww * 0.48;
        var scrollH = wh;

        _this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        //加载首组图片
        _this.loadImages();
      }
    });
  },

  onReachBottom: function onReachBottom() {
    this.loadImages();
  },

  //瀑布流
  onImageLoad: function onImageLoad(e) {
    var imageId = e.currentTarget.id;
    var oImgW = e.detail.width; //图片原始宽度
    var oImgH = e.detail.height; //图片原始高度
    var imgWidth = this.data.imgWidth; //图片设置的宽度
    var scale = imgWidth / oImgW; //比例计算
    var imgHeight = oImgH * scale; //自适应高度

    var images = this.data.images;
    var imageObj = null;

    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    var loadingCount = this.data.loadingCount - 1;
    var col1 = this.data.col1;
    var col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    var data = {
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

  imageDate: [{ pic: "http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370!960xAuto", height: 0 }, { pic: "http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg!960xAuto", height: 0 }, { pic: "http://image.artful.com.cn/artful/other/2017-12-16/6439ac986b55971d!960xAuto", height: 0 }, { pic: "http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg!960xAuto", height: 0 }],

  loadImages: function loadImages() {
    this.imageDate = this.imageDate.concat([{ pic: "http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg!960xAuto", height: 0 }, { pic: "http://image.artful.com.cn/artful/other/2017-12-16/6439ac986b55971d!960xAuto", height: 0 }, { pic: "http://image.artful.com.cn/artful/other/2017-12-08/6dbd9088de7404a0.jpg!960xAuto", height: 0 }, { pic: "http://image.artful.com.cn/artful/other/2017-12-16/cf76da9725aade55!960xAuto", height: 0 }, { pic: "http://image.artful.com.cn/artful/other/2017-12-16/3e8814abf1d2d370!960xAuto", height: 0 }]);
    var images = this.imageDate;

    var baseId = "img-" + +new Date();

    for (var i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });
  }
});
//# sourceMappingURL=index.js.map
