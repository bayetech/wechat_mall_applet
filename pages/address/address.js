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
    var p = this.data.arrayProvince[this.data.indexProvince]
    var currentAddress = this.data.address
    currentAddress.province = p
    this.setData({
      indexProvince: e.detail.value,
      arrayCity: district.cities(p),
      address: currentAddress
    })
  },

  bindChangeCity: function(e) {
    var p = this.data.arrayProvince[this.data.indexProvince]
    var c = this.data.arrayCity[this.data.indexCity]
    var currentAddress = this.data.address
    currentAddress.city = c
    this.setData({
      indexCity: e.detail.value,
      arrayCounty: district.counties(p,c),
      address: currentAddress
    })
  },

  bindChangeCounty: function(e) {
    var county = this.data.arrayCounty[this.data.indexCounty]
    var currentAddress = this.data.address
    currentAddress.county = county
    this.setData({
      indexCounty: e.detail.value,
      address: currentAddress
    })
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
    this.setData({'arrayProvince': district.provinces()})
  }
})
