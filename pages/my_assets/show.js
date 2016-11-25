const my_assets = require('../../utils/my_assets.js')

Page({
  data: {
    my_asset: '',
    years: '',
  },

  onLoad: function(params) {
    var that = this

    my_assets.getAsset(params.sku, function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({'my_asset': data})
      that.setData({'years': Object.keys(data['inventory-changes'])})
      wx.setStorage({
        key: "my_asset",
        data: data
      })
    })
  }
})
