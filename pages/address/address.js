const address = require('../../utils/address.js')
const district = require('../../utils/address_data.js')

Page({
  data: {
    detailAddress: '',
    receiverName:'',
    receiverMobile:'',
    arrayProvince: [],
    arrayCity: [],
    arrayCounty: [],
    indexProvince: 0,
    indexCity: 0,
    indexCounty: 0,

    errorHidden: true,
    msg: '不能为空'
  },

  bindChangeProvince: function(e) {
    var p = this.data.arrayProvince[e.detail.value]
    var arrayCity = district.cities(p)
    var c = arrayCity[0]

    this.setData({
      indexProvince: e.detail.value,
      arrayCity: arrayCity,
      arrayCounty: district.counties(p,c)
    })
    wx.setStorageSync('currentDistrict', [this.data.indexProvince, this.data.indexCity, this.data.indexCounty])
  },

  bindChangeCity: function(e) {
    var p = this.data.arrayProvince[this.data.indexProvince]
    var c = this.data.arrayCity[e.detail.value]
    this.setData({
      indexCity: e.detail.value,
      arrayCounty: district.counties(p,c)
    })
    wx.setStorageSync('currentDistrict', [this.data.indexProvince, this.data.indexCity, this.data.indexCounty])
  },

  bindChangeCounty: function(e) {
    this.setData({
      indexCounty: e.detail.value
    })
    wx.setStorageSync('currentDistrict', [this.data.indexProvince, this.data.indexCity, this.data.indexCounty])
  },

  formSubmit: function(e) {
    // this.setData({'detailAddress': e.detail.value.inputDetail})
    wx.setStorage({key:'detailAddress', data: e.detail.value.inputDetail.trim()})

    var receiverName = e.detail.value.inputName.trim()
    var receiverMobile = e.detail.value.inputMobile.trim()
    if (!(receiverName && receiverMobile)) {
      this.setData({
        msg: '收货人姓名和手机号不能为空',
        errorHidden: false
      })
      return
    }
    if (!receiverMobile.match(/^1[3-9][0-9]\d{8}$/)) {
      this.setData({
        msg: '手机号格式不正确，仅支持国内手机号码',
        errorHidden: false
      })
      return
    }
    wx.setStorage({key:'receiverName', data: receiverName})
    wx.setStorage({key:'receiverMobile', data: receiverMobile})
    wx.navigateBack()
  },

  confirmError: function(){
    this.setData({errorHidden: true})
  },

  onLoad (params) {
    var currentDistrict = wx.getStorageSync('currentDistrict') || [0, 0, 0]
    var arrayProvince = district.provinces()
    var arrayCity     = district.cities(arrayProvince[currentDistrict[0]])
    var arrayCounty   = district.counties(arrayProvince[currentDistrict[0]], arrayCity[currentDistrict[1]])

    this.setData({
      indexProvince:  currentDistrict[0],
      indexCity:      currentDistrict[1],
      indexCounty:    currentDistrict[2],
      arrayProvince:  arrayProvince,
      arrayCity:      arrayCity,
      arrayCounty:    arrayCounty,
      detailAddress:  wx.getStorageSync('detailAddress'),
      receiverName:   wx.getStorageSync('receiverName'),
      receiverMobile: wx.getStorageSync('receiverMobile')
    })
  }
})
