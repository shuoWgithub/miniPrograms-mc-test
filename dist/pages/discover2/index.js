'use strict';

// 获取全局应用程序实例对象
var app = getApp();

var col1H = 0;
var col2H = 0;

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Demo page',
    background: [{ url: 'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534!960xAuto', uuid: app.util.uuid() }, { url: 'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534!960xAuto', uuid: app.util.uuid() }, { url: 'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534!960xAuto', uuid: app.util.uuid() }, { url: 'http://image.artful.com.cn/artful/other/2017-12-16/6f1f61919338a534!960xAuto', uuid: app.util.uuid() }],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    styleSeries: [{
      id: '123',
      name: '现实主义'
    }, {
      id: '1234',
      name: '现实主义'
    }, {
      id: '1235',
      name: '现实主义'
    }, {
      id: '1236',
      name: '现实主义'
    }, {
      id: '1237',
      name: '现实主义'
    }, {
      id: '1238',
      name: '现实主义'
    }],
    currentStyleSeriesId: '',

    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    shortCol: 0,

    artistList: [{
      userId: '111',
      name: '今敏',
      avatar: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
      list: [{
        url: 'http://image.artful.com.cn/artful/other/2017-12-25/1a87be94254d4cd8!960xAuto',
        id: app.util.uuid()
      }, {
        url: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
        id: app.util.uuid()
      }, {
        url: 'http://image.artful.com.cn/artful/other/2017-12-22/30726fac9c4060d1!960xAuto',
        id: app.util.uuid()
      }]
    }, {
      userId: '222',
      name: '今敏',
      avatar: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
      list: [{
        url: 'http://image.artful.com.cn/artful/other/2017-12-25/1a87be94254d4cd8!960xAuto',
        id: app.util.uuid()
      }, {
        url: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
        id: app.util.uuid()
      }, {
        url: 'http://image.artful.com.cn/artful/other/2017-12-22/30726fac9c4060d1!960xAuto',
        id: app.util.uuid()
      }]
    }, {
      userId: '333',
      name: '今敏',
      avatar: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
      list: [{
        url: 'http://image.artful.com.cn/artful/other/2017-12-25/1a87be94254d4cd8!960xAuto',
        id: app.util.uuid()
      }, {
        url: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
        id: app.util.uuid()
      }, {
        url: 'http://image.artful.com.cn/artful/other/2017-12-22/30726fac9c4060d1!960xAuto',
        id: app.util.uuid()
      }]
    }, {
      userId: '444',
      name: '今敏',
      avatar: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
      list: [{
        url: 'http://image.artful.com.cn/artful/other/2017-12-25/1a87be94254d4cd8!960xAuto',
        id: app.util.uuid()
      }, {
        url: 'http://image.artful.com.cn/artful/other/2017-12-22/a6509c8747e0dfb5!960xAuto',
        id: app.util.uuid()
      }, {
        url: 'http://image.artful.com.cn/artful/other/2017-12-22/30726fac9c4060d1!960xAuto',
        id: app.util.uuid()
      }]
    }]

  },

  onLoad: function onLoad() {
    var _this = this;

    var wThis = this;
    //默认选定风格
    this.setData({ currentStyleSeriesId: wThis.data.styleSeries[0].id });

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

  //选定风格系列
  selectStyleSeries: function selectStyleSeries(e) {
    //todo; request
    var styleSeriedId = e.currentTarget.dataset.id;
    this.setData({ currentStyleSeriesId: styleSeriedId });
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
      //判断最下colHeight
      data.shortCol = col1H < col2H ? 0 : 1;
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
