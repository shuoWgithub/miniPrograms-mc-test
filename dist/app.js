'use strict';

/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
var wechat = require('./utils/wechat');
var util = require('./utils/util');
var Promise = require('./utils/bluebird');

App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: 'WeApp Boilerplate',
    version: '0.1.0',
    userInfo: null
  },

  // 不是只能定义`data`，别的也可以
  other: 'other variables',

  /**
   *  util
   */
  util: util,

  /**
   * 获取用户信息
   * @return {Promise} 包含获取用户信息的`Promise`
   */
  getUserInfo: function getUserInfo() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (_this.data.userInfo) return resolve(_this.data.userInfo);
      wechat.login().then(function () {
        return wechat.getUserInfo();
      }).then(function (res) {
        return res.userInfo;
      }).then(function (info) {
        return _this.data.userInfo = info;
      }).then(function (info) {
        return resolve(info);
      }).catch(function (error) {
        return console.error('failed to get user info, error: ' + error);
      });
    });
  },


  /**
  * 生命周期函数--监听小程序初始化
  * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  */
  onLaunch: function onLaunch() {
    console.log(' ========== Application is launched ========== ');
  },

  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function onShow() {
    console.log(' ========== Application is showed ========== ');
  },

  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function onHide() {
    console.log(' ========== Application is hid ========== ');
  }
});

////自定义bar
// editTabBar: function () {
//   var tabbar = this.globalData.tabbar
//   var currentPages = getCurrentPages()
//   var _this = currentPages[currentPages.length - 1]
//   var pagePath = _this.__route__;
//   (pagePath.indexOf('/') !== 0) && (pagePath = '/' + pagePath)
//   for (var i in tabbar.list) {
//     tabbar.list[i].selected = false;
//     (tabbar.list[i].pagePath === pagePath) && (tabbar.list[i].selected = true)
//   }
//   _this.setData({
//     tabbar: tabbar
//   })
// },
//
// globalData: {
//   userInfo: null,
//     tabbar: {
//     color: '#000000',
//       selectedColor: '#0f87ff',
//       backgroundColor: '#ffffff',
//       borderStyle: 'black',
//       list: [
//       {
//         pagePath: '/pages/discover/index',
//         text: '发现',
//         iconPath: '/images/btn_discover.png',
//         selectedIconPath: '/images/btn_discover_HL.png',
//         selected: true
//       },
//       {
//         pagePath: '/pages/demo/demo',
//         text: '艺术品',
//         iconPath: '/images/btn_artwork.png',
//         selectedIconPath: '/images/btn_artwork_HL.png',
//         selected: false
//       },
//       {
//         pagePath: '/pages/index/index',
//         text: '共享订制',
//         iconPath: '/images/btm_logo.png',
//         selectedIconPath: '/images/btm_logo_HL.png',
//         selected: false
//       },
//       {
//         pagePath: '/pages/demo/demo',
//         text: '艺术家',
//         iconPath: '/images/btn_artist.png',
//         selectedIconPath: '/images/btn_artist_HL.png',
//         selected: false
//       },
//       {
//         pagePath: '/pages/demo/demo',
//         text: '我的',
//         iconPath: '/images/btn_me.png',
//         selectedIconPath: '/images/btn_me_HL.png',
//         selected: false
//       }
//     ],
//       position: 'bottom'
//   }
// },
//# sourceMappingURL=app.js.map
