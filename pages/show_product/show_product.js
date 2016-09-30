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

    that.data.product = wx.getStorageSync('products').find(function(i){
      return i.id === that.data.id;
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
    e.detail.value['sku'] = e.target.dataset['sku']
    //  address.postBuyProduct(e.detail.value)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function(e) {
    console.log('form发生了reset事件')
  }
})
