const address = require('../../utils/address.js')

Page({
  formSubmit: function(e) {
    address.postAddress(e.detail.value)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function(e) {
    console.log('form发生了reset事件')
  }
})
