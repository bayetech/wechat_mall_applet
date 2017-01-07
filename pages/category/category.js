const product = require('../../utils/product.js')
var app = getApp()

Page({
  data: {
    title: '',
    items: null,
    accountType: '',
    categoryType: null
  },

  onLoad: function(params) {
    var that = this
    this.setData({
      title: '巴爷供销社 - ' + params.type,
      categoryType: params.type
    })
    product.getCategories(params.typeId, function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({items: data})
      wx.setStorage({
        key: `cate_${params.type}`,
        data: data
      })
    }, function(fail) {
      var key = `cate_${params.type}`
      var data = wx.getStorage(key)
      wx.setData({items: data})
    })
  },

  onShow() {
    if (app.globalData.currentCustomer) {
      var accountType = app.globalData.currentCustomer.account_type
      this.setData({accountType: accountType})
    }
  },

  onReady() {
    wx.setNavigationBarTitle({ title: this.data.title })
  },

  bindTapProduct: function(e) {
    var that = this

    wx.navigateTo({
      url: `../show_product/show_product?id=${e.currentTarget.dataset.id}&type=${this.data.categoryType}`
    })
  }
})
