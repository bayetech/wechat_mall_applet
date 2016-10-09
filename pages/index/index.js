var app = getApp()
const product = require('../../utils/product.js')

Page({
  data: {items: [], slides: []},

  onLoad: function() {
    var that = this

    product.getSlides().then(function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({'slides': data})
      wx.setStorage({
        key:"indexSlides",
        data:data
      })
    })

    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        if (networkType) {
          product.getProducts().then(function(result) {
            var data = getApp().store.sync(result.data)
            that.setData({'items': data})
            wx.setStorageSync('products', data)
          })
        } else {
           cache = wx.getStorageSync('products')
           if (cache) {
             that.setData({'items': cache})
           } else {
             that.setData({'items': []})
           }
        }
      }
    })
  }
})
