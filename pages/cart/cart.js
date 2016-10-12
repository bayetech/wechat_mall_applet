const district = require('../../utils/address_data.js')

Page({
  data: {
    deleteModalHidden: true,
    wantToDeleteItem: '',
    address:{},
    cartItems:[],
    amount:0
  },

  onLoad: function (params) {
  },

  onShow: function (params) {
    var cartItems = wx.getStorageSync("cartItems")
    this.setData({cartItems: cartItems})

    var detailAddress = wx.getStorageSync('detailAddress')
    var receiverName = wx.getStorageSync('receiverName')
    var receiverMobile = wx.getStorageSync('receiverMobile')
    var address = {detail: detailAddress, name: receiverName, mobile: receiverMobile}

    var districtIndex = wx.getStorageSync('currentDistrict') || [0,0,0]
    address.province = district.provinces()[districtIndex[0]]
    address.city     = district.cities(address.province)[districtIndex[1]]
    address.county   = district.counties(address.province, address.city)[districtIndex[2]]

    this.setData({address: address})
  },

  bindChangeQuantity: function (e) {
    //TODO findex, add quantity
  },

  // tap on item to delete cart item
  bindTapOnItem: function (e) {
    this.setData({
      deleteModalHidden: false,
      wantToDeleteItem: e.currentTarget.dataset.id
    })
  },

  deleteModalChange: function (e) {
    var that = this
    if (e.type === "confirm") {
      var cartItems = that.data.cartItems
      var index = cartItems.findIndex(function(ele){
        return ele.id === that.data.wantToDeleteItem
      })
      cartItems.splice(index, 1)
      this.setData({ cartItems: cartItems })
      wx.setStorage({
        key: 'cartItems',
        data: cartItems
      })
    }
    this.setData({
      deleteModalHidden: true
    })
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
