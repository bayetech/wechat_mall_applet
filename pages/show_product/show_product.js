const product = require('../../utils/product.js')
var app = getApp()
Page({
  data: {
    title: '',
    id: 0,
    quantity: 1,
    product: {},
    windowWidth: 375,
    windowHeight: 667,
    pixelRatio: 2,
    accountType: '' 
  },

  onLoad (params) {
    try {
      var res = wx.getSystemInfoSync()
      this.setData({
        windowWidth:  res.windowWidth,
        windowHeight: res.windowHeight,
        pixelRatio:   res.pixelRatio
      })
      app.globalData.windowWidth  = res.windowWidth
      app.globalData.windowHeight = res.windowHeight
      app.globalData.pixelRatio   = res.pixelRatio
    } catch (e) {
    }

    var allProducts = wx.getStorageSync('products')
    var id = params.id
    var product = allProducts.filter(function(i){
      return i.id === id
    })[0]

    this.setData({
      id: id,
      product: product,
      title: product.name
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

  bindAddToCart (e) {
    var that = this

    //管到屏蔽
    if (this.data.product && (parseInt(this.data.product['category-id']) === 18)) {
      wx.showModal({
        title: '管到商品暂未开放',
        content: '目前无法在小程序上购买管到商品，如有需要，可以在巴爷微信商城上进行购买。',
        showCancel: false,
        success: function(res) {}
      })
      return
    }


    var cartItems = wx.getStorageSync('cartItems') || []

    var exist = cartItems.filter(function(ele){
      return ele.id === that.data.id
    })[0]

    if (exist) {
      exist.quantity = parseInt(exist.quantity) + 1
    } else {
      cartItems.push({
        id: this.data.id,
        quantity: this.data.quantity,
        product: this.data.product
      })
    }
    wx.showToast({
      title: '成功加入购物车',
      icon: 'success',
      duration: 1200
    })
    wx.setStorage({
      key: 'cartItems',
      data: cartItems
    })
  },

  bindQuantityInput (e) {
    this.setData({'quantity': e.detail.value})
  },
})
