const address = require('../../utils/address.js')
const district = require('../../utils/address_data.js')

Page({
  data: {
    detailAddress: '',
    receiverName:'',
    receiverMobile:'',
    arrayProvince: [],
    indexProvince: 0,
    arrayCity: [],
    indexCity: 0,
    arrayCounty: [],
    indexCounty: 0
  },

  bindChangeProvince: function(e) {
    var p = this.data.arrayProvince[e.detail.value]
    var arrayCity = district.cities(p)
    var c = arrayCity[0]

    this.setData({
      indexProvince: e.detail.value,
      arrayCity: arrayCity,
      arrayCounty:district.counties(p,c)
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
    var county = this.data.arrayCounty[this.data.indexCounty]
    this.setData({
      indexCounty: e.detail.value
    })
    wx.setStorageSync('currentDistrict', [this.data.indexProvince, this.data.indexCity, this.data.indexCounty])
  },

  formSubmit: function(e) {
    this.setData({'detailAddress': e.detail.value.input})
    wx.setStorage({key:'detailAddress', data: e.detail.value.inputDetail})
    wx.setStorage({key:'receiverName', data: e.detail.value.inputName})
    wx.setStorage({key:'receiverMobile', data: e.detail.value.inputMobile})
    wx.navigateBack()
  },
  formReset: function(e) {
    console.log('form 发生了 reset 事件')
  },

  onLoad (params) {
    this.setData({'detailAddress': wx.getStorageSync('detailAddress'),
                  'receiverName': wx.getStorageSync('receiverName'),
                  'receiverMobile': wx.getStorageSync('receiverMobile')})
    var currentDistrict = wx.getStorageSync('currentDistrict') || [0, 0, 0]
    var arrayProvince = district.provinces()
    this.setData({
      indexProvince: currentDistrict[0],
      indexCity:     currentDistrict[1],
      indexCounty:   currentDistrict[2],
      arrayProvince: arrayProvince
    })
    var arrayCity     = district.cities(arrayProvince[currentDistrict[0]])
    this.setData({arrayCity: arrayCity})
    var arrayCounty   = district.counties(arrayProvince[currentDistrict[0]], arrayCity[currentDistrict[1]])
    this.setData({arrayCounty: arrayCounty})
  }
})
