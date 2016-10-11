const district = require('../../utils/address_data.js')

Page({
  data: {
    address:{}
  },

  onLoad: function (params) {
  },

  onShow: function (params) {
    var address = {}
    var detailAddress = wx.getStorageSync('detailAddress')
    address.detail = detailAddress

    var districtIndex = wx.getStorageSync('currentDistrict')
    address.province = district.provinces()[districtIndex[0]]
    address.city     = district.cities(address.province)[districtIndex[1]]
    address.county   = district.counties(address.province, address.city)[districtIndex[2]]

    this.setData({address: address})
  },

  // bindBilling: function () {
  //   var cartItems = wx.getStorageSync('cartItems')
  // },

  bindTapAddress () {
    wx.navigateTo({
      url: '../address/address'
    })
  }
})
