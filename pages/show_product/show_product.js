const app = getApp()
const product = require('../../utils/product.js')

Page({
  data: {
    title: '',
    id: 0,
    address: '',
    quantity: 1,
    product: {}
  },

  onShow () {
    this.setData({'address': Date.now()})
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

  bindTapAddress () {
    wx.navigateTo({
      url: '../address/address'
    })
  },

  bindAddToCart (e) {
    var cartItems = wx.getStorageSync('cartItems') || {data:[]}

    var exist = cartItems.data.find(function(ele){
      return ele.id === app.getCurrentPage().data.id
    })

    if (exist) {
      exist.quantity = this.data.quantity
    } else {
      var model = getApp().jsonModel
      var product = new model('product', this.data.id)
      product.setAttribute('quantity', this.data.quantity)
      cartItems.data.push(product)
    }

    wx.setStorage({
      key: 'cartItems',
      data: cartItems
    })
  },

  bindQuantityInput (e) {
    this.setData({'quantity': e.detail.value})
  },

  formSubmit: function(e) {
    e.detail.value['sku'] = e.target.dataset['sku']
    //  address.postBuyProduct(e.detail.value)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})
