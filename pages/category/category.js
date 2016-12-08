const product = require('../../utils/product.js')
var app = getApp()

Page({
  data: {
    title: '',
    items: [],
    accountType: '',
    categoryType: null
  },

  onLoad: function(params) {
    var that = this
    this.setData({
      title: '巴爷供销社 - ' + params.type,
      categoryType: params.type
    })
    product.getCategories(params.type, function(result) {
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

    // 管到屏蔽
    if (this.data.categoryType === '管到') {
      wx.showModal({
        title: '管到商品暂未开放',
        content: '目前无法在小程序上购买管到商品，如有需要，可以在巴爷微信商城上进行购买。感谢您的理解，我们会尽快完善此功能。',
        showCancel: false,
        success: function(res) {}
      })
      return
    }


    var cartItems = wx.getStorageSync('cartItems') || []
    var thisItem  = this.data.items.filter(function(ele){
      return ele.id === e.currentTarget.dataset.id
    })[0]

    if (thisItem) {
      var exist = cartItems.filter(function(ele){
        return ele.id === thisItem.id
      })[0]
    }


    // 管到屏蔽
    if (thisItem && (parseInt(thisItem['category-id']) === 18)) {
      wx.showModal({
        title: '管到商品暂未开放',
        content: '目前无法在小程序上购买管到商品，如有需要，可以在巴爷微信商城上进行购买。感谢您的理解，我们会尽快完善此功能。',
        showCancel: false,
        success: function(res) {}
      })
      return
    }

    if (exist) {
      exist.quantity = parseInt(exist.quantity) + 1
    } else {
      cartItems.push({
        id: thisItem.id,
        quantity: '1',
        product: thisItem
      })
    }
    wx.setStorage({
      key: 'cartItems',
      data: cartItems
    })
    wx.showToast({
      title: '成功加入购物车',
      icon: 'success',
      duration: 1000
    })
  }
})
