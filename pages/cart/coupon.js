var app = getApp()

Page({
  data: {
    coupons: []
  },

  onShow: function() {
  },

  onLoad: function() {
    this.getCoupons()
  },

  getCoupons: function() {
    // for test
    // var data = wx.getStorageSync('coupons')
    // this.setData({coupons: data})
    var that = this
    app.authRequest({
      url: `${app.globalData.API_URL}/coupons`,
      method: 'GET',
      success: function(res){
        var data = app.store.sync(res.data)
        that.setData({coupons: data})
      }
    })
  }
})