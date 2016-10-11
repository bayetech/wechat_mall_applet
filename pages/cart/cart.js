Page({
  data: {
    address: null
  },

  onLoad: function (params) {
  },

  onShow: function (params) {
    var address = wx.getStorageSync('address')
    this.setData({'address': address})
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
