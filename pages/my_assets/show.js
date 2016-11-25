const my_assets = require('../../utils/my_assets.js')

Page({
  data: {
    my_asset: '',
  },

  onLoad: function(params) {
    var that = this

    my_assets.getAsset(params.sku, function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({'my_asset': data})
      wx.setStorage({
        key: "my_asset",
        data: data
      })
    })
  }
})
