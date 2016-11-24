const product = require('../../utils/my_assets.js')

Page({
  data: {
  },

  onLoad: function() {
    var that = this

    product.getAsset(function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({'my_assets': data})
      wx.setStorage({
        key: "my_assets",
        data: data
      })
    })
  }
})
