Page({
  data: {
    
  },

  onShow: function() {
  },

  onLoad: function() {
    this.getCoupon()
  },

  getCoupon: function() {
    wx.request({
      url: `${getApp().globalData.API_URL}/coupons`,
      data: {},
      method: 'GET',
      success: function(res){
      },
      fail: function() {
      },
      complete: function() {
      }
    })
  }
})