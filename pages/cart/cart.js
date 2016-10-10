Page({
  data: {
    address: '',
  },

  onLoad: function() {
    var that = this
  },

  onShow () {
    var address = wx.getStorageSync('address')
    this.setData({'address': address})
  },

  bindBilling () {
    var cartItems = wx.getStorageSync('cartItems')
  },

  bindTapAddress () {
    wx.navigateTo({
      url: '../address/address'
    })
  }
})
