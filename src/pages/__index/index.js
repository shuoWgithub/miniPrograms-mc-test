import { GET } from '../../libs/request.js'

// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Index page2w',
    userInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    console.log(' ---------- onLoad ----------')

    app.getUserInfo()
      .then(info => {
        this.setData({ userInfo: info })
      })
      .catch(console.info)


    let url = `https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18317095413`;
    GET(url).then(function (res) {
      console.log(res)
    }, function (err) {
      console.log(err)
    }).catch(function (err) {
      console.error(err)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    console.log(' ---------- onPullDownRefresh ----------')
  }
})
