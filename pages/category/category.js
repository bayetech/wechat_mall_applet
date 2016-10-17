const product = require('../../utils/product.js')

Page({
  data: {
    items: []
  },

  onLoad: function(params) {
    var that = this
    product.getCategories(params.type).then(function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({'items': data})
      wx.setStorage({
        key:`cate_${params.type}`,
        data:data
      })
    })
  }
})
