const address = require('../../utils/address.js')
const district = require('../../utils/address_data.js')

Page({
  data: {
    address: {},
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
    var currentAddress = this.data.address
    currentAddress.province = p
    this.setData({
      indexProvince: e.detail.value,
      arrayCity: arrayCity,
      arrayCounty:district.counties(p,c),
      address: currentAddress
    })
    wx.setStorageSync('currentDistrict', [this.data.indexProvince, this.data.indexCity, this.data.indexCounty])
  },

  bindChangeCity: function(e) {
    var p = this.data.arrayProvince[this.data.indexProvince]
    var c = this.data.arrayCity[e.detail.value]
    var currentAddress = this.data.address
    currentAddress.city = c
    this.setData({
      indexCity: e.detail.value,
      arrayCounty: district.counties(p,c),
      address: currentAddress
    })
    wx.setStorageSync('currentDistrict', [this.data.indexProvince, this.data.indexCity, this.data.indexCounty])
  },

  bindChangeCounty: function(e) {
    var county = this.data.arrayCounty[this.data.indexCounty]
    var currentAddress = this.data.address
    currentAddress.county = county
    this.setData({
      indexCounty: e.detail.value,
      address: currentAddress
    })
    wx.setStorageSync('currentDistrict', [this.data.indexProvince, this.data.indexCity, this.data.indexCounty])
  },

  formSubmit: function(e) {
    var currentAddress = this.data.address
    currentAddress.detail = e.detail.value.input
    this.setData({'address': currentAddress})
    wx.setStorage({key:'address', data:currentAddress})
    wx.navigateBack()
  },
  formReset: function(e) {
    console.log('form 发生了 reset 事件')
  },

  onLoad (params) {
    var address = wx.getStorageSync('address')
    this.setData({'address': address})
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
