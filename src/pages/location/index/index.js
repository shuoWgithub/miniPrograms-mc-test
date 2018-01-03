import { selectCitys } from '../../../components/select_citys/index'

// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    initCityData: selectCitys.initCityData
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    selectCitys.onLoad()
  }
})
