var app = getApp()
const product = require('../../utils/product.js')

Page({
  data: {items: [], slides: []},

  onLoad: function() {
    var that = this

    product.getSlides().then(function(result) {
      that.setData({'slides': result.data.data})
      wx.setStorage({
        key:"indexSlides",
        data:result.data
      })
    })

    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        if (networkType) {
          product.getProducts().then(function(result) {
            that.data.items = result.data.data
            wx.setStorageSync('products', result.data)
          })
        } else {
           cache = wx.getStorageSync('products')
           if (cache) {
             this.data.items = cache
           } else {
             this.data.items = []
           }
        }
      }
    })
  }
})
