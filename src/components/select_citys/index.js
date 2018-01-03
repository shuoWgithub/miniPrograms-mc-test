//index.js
//获取应用实例
var tcity = require("../../utils/citys.js");
var that;

var initCityData = {
  provinces: [],
  province: "",
  citys: [],
  city: "",
  countys: [],
  county: '',
  value: [0, 0, 0],
  values: [0, 0, 0],
  condition: false
}

function bindChange(e) {
  if (e == undefined){
    throw "请传入element对象"
  }
  var val = e.detail.value
  var t = that.data.initCityData.values;
  var cityData = that.data.cityData;

  if(val[0] != t[0]){
    console.log('province no ');
    const citys = [];
    const countys = [];

    for (let i = 0 ; i < cityData[val[0]].sub.length; i++) {
      citys.push(cityData[val[0]].sub[i].name)
    }
    for (let i = 0 ; i < cityData[val[0]].sub[0].sub.length; i++) {
      countys.push(cityData[val[0]].sub[0].sub[i].name)
    }

    that.setData({
      'initCityData.province': that.data.initCityData.provinces[val[0]],
      'initCityData.city': cityData[val[0]].sub[0].name,
      'initCityData.citys':citys,
      'initCityData.county': cityData[val[0]].sub[0].sub[0].name,
      'initCityData.countys':countys,
      'initCityData.values': val,
      'initCityData.value':[val[0],0,0]
    })

    return;
  }
  if(val[1] != t[1]){
    console.log('city no');
    const countys = [];

    for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
      countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
    }

    that.setData({
      'initCityData.city': that.data.initCityData.citys[val[1]],
      'initCityData.county': cityData[val[0]].sub[val[1]].sub[0].name,
      'initCityData.countys':countys,
      'initCityData.values': val,
      'initCityData.value':[val[0],val[1],0]
    })
    return;
  }
  if(val[2] != t[2]){
    console.log('county no');
    that.setData({
      'initCityData.county': that.data.initCityData.countys[val[2]],
      'initCityData.values': val
    })
    return;
  }
}

function open() {
  that.setData({
    'initCityData.condition': !that.data.initCityData.condition
  })
}

function onLoad(wThis) {

  if (wThis == undefined){
    throw "请传入page this对象"
  }

  that = wThis;

  tcity.init(that);
  var cityData = that.data.cityData;

  const provinces = [];
  const citys = [];
  const countys = [];

  for(let i=0;i<cityData.length;i++){
    provinces.push(cityData[i].name);
  }
  console.log('省份完成');
  for (let i = 0 ; i < cityData[0].sub.length; i++) {
    citys.push(cityData[0].sub[i].name)
  }
  console.log('city完成');
  for (let i = 0 ; i < cityData[0].sub[0].sub.length; i++) {
    countys.push(cityData[0].sub[0].sub[i].name)
  }

  that.setData({
    'initCityData.provinces': provinces,
    'initCityData.citys':citys,
    'initCityData.countys':countys,
    'initCityData.province':cityData[0].name,
    'initCityData.city':cityData[0].sub[0].name,
    'initCityData.county':cityData[0].sub[0].sub[0].name
  })
  console.log('初始化城市选择完成');
}


module.exports = {
  initCityData,
  bindChange,
  open,
  onLoad
}
