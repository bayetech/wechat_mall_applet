const product = require('../../utils/product.js')

Page({
  data: {
    title: '',
    id: 0,
    quantity: 1,
    product: {}
  },

  onLoad (params) {
    var id = params.id
    var product = wx.getStorageSync('products').find(function(i){
      return i.id === id
    })

    this.setData({
      id: id,
      product: product,
      title: product.name
    })
  },

  onReady() {
    wx.setNavigationBarTitle({ title: this.data.title })
  },

  bindAddToCart (e) {
    var that = this
    var cartItems = wx.getStorageSync('cartItems') || []

    var exist = cartItems.find(function(ele){
      return ele.id === that.data.id
    })

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
