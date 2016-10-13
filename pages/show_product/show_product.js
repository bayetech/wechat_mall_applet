const app = getApp()
const product = require('../../utils/product.js')

Page({
  data: {
    toastAddProduct: true,
    title: '',
    id: 0,
    quantity: 1,
    product: {}
  },

  onShow () {
  },

  onLoad (params) {
    var that = this
    this.data.id = params.id
    that.data.product = wx.getStorageSync('products').find(function(i){
      return i.id === that.data.id
    })
  },

  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title })
  },

  bindAddToCart (e) {
    var cartItems = wx.getStorageSync('cartItems') || []

    var exist = cartItems.find(function(ele){
      return ele.id === app.getCurrentPage().data.id
    })

    if (exist) {
      exist.quantity = this.data.quantity
    } else {
      // var model = getApp().jsonModel
      // var product = new model('products', this.data.id)
      // product.setAttribute('quantity', this.data.quantity)
      var product = {id: this.data.id,
                     quantity: this.data.quantity,
                     product: this.data.product}
      cartItems.push(product)
    }
    this.setData({ toastAddProduct:false });

    wx.setStorage({
      key: 'cartItems',
      data: cartItems
    })
  },

  bindQuantityInput (e) {
    this.setData({'quantity': e.detail.value})
  },

  toastChange: function(){
    this.setData({ toastAddProduct:true });
  }
})
