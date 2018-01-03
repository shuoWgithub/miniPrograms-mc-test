import selectCitys from '../../../components/select_citys/index'

// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputHide: false,
    initCityData: selectCitys.initCityData,
    isBusiness: true,
    uuid: app.util.uuid,
    selectDateId: null,
    locationMaskOpne: false,
    packageList:[{time: 10},{time: 20},{time: 30}],
    additionalList: [
      {
        id: '123',
        selected: false,
        content: '是否需要新作半年替换服务'
      },
      {
        id: '1234',
        selected: false,
        content: '是否需要新作半年替换服务'
      },
      {
        id: '1235',
        selected: false,
        content: '是否需要新作半年替换服务'
      }
    ],
    locationList: [
      {
        corporation: '北京开维思文化艺术有限公司',
        name: '王晓棠',
        tel: '18800008888',
        address: '北京市 北京市 朝阳区 光华路9号 SOHO2期3Q'
      },
      {
        corporation: '北京开维思文化艺术有限公司',
        name: '王晓棠',
        tel: '18800008888',
        address: '北京市 北京市 朝阳区 光华路9号 SOHO2期3Q'
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    var wThis = this

    this.setData({selectDateId: this.data.packageList[0].time})

    //onload selectCitys
    selectCitys.onLoad(wThis)
  },

  selectType: function (e) {
    this.setData({
      isBusiness: e.target.dataset.type == 'true'
    })
  },

  selectTime: function (e) {
    this.setData({selectDateId:  e.currentTarget.dataset.time})
  },

  selectAdditional: function (e) {
    var alist = this.data.additionalList
    alist.forEach(function (value) {
      if(value.id == e.currentTarget.dataset.additional.id){
        value.selected = !value.selected
      }
    })

    this.setData({additionalList: alist})
  },

  openLocationMask: function () {
    this.setData({locationMaskOpne: !this.data.locationMaskOpne, inputHide: !this.data.locationMaskOpne})
  },

  open(){
    this.setData({inputHide: !this.data.initCityData.condition})
    selectCitys.open()
  },

  bindChange (e) {
    selectCitys.bindChange(e)
  }
})
