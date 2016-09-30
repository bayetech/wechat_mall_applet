const app = getApp()
const product = require('../../utils/product.js')

Page({
  data: {
    title: '',
    id: 0,
    address: '',
    product: {}
  },

  onShow () {
    this.setData({'address': Date.now()})
  },

  onLoad (params) {
    var that = this
    this.data.id = params.id

    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        debugger
        if (networkType) {
          product.getProduct(params.id).then(function(result) {
            console.log(result)
            that.data.product = result.data
            wx.setStorage({key: `product-${params.id}`, value: that.data.product})
          })
        } else {
           cache = wx.getStorageSync(`product-${params.id}`)
           if (cache) {
             this.data.product = cache
           } else {
             this.data.product = {}
           }
        }
      }
    })

  },

  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title })
  },

  bindTapAddress () {
    wx.navigateTo({
      url: '../address/address'
    })
  },

  formSubmit: function(e) {
    //  address.postBuyProduct(e.detail.value)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function(e) {
    console.log('form发生了reset事件')
  }
})
