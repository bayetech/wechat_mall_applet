const address = require('../../utils/address.js')

Page({
  formSubmit: function(e) {
    address.postAddress(e.detail.value)
    console.log('form 发生了 submit 事件，携带数据为：', e.detail.value)
  },
  formReset: function(e) {
    console.log('form 发生了 reset 事件')
  },

  onLoad (params) {
    //this.data.sku = params.sku
  }
})
