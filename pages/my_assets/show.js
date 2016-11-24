const my_assets = require('../../utils/my_assets.js')

Page({
  data: {
  },

  onLoad: function(params) {
    var that = this

    my_assets.getAsset(params.sku, function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({'my_assets': data})
      wx.setStorage({
        key: "my_assets",
        data: data
      })
    })
  }
})
