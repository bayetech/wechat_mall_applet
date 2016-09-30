const address = require('../../utils/address.js')

Page({
  data: {
    arraySheng: ['美国', '中国', '巴西', '日本'],
    indexSheng: 0,
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexSheng: e.detail.value
    })
  },

  formSubmit: function(e) {
    address.postAddress(e.detail.value)
    console.log('form 发生了 submit 事件，携带数据为：', e.detail.value)
  },
  formReset: function(e) {
    console.log('form 发生了 reset 事件')
  },

  onLoad (params) {
    //this.data.sku = params.sku

  },


  getAddressMenu: function() {
    var that = this

    wx.request({
      method: 'POST',
      url: `cities?province=${that.data.arraySheng[indexSheng]}`,
      data: Object.assign({}, data),
      header: { 'Content-Type': 'application/json' },
      success (res) {
        debugger
        console.log('success')
        wx.setStorageSync('addrss', res.data)
        wx.navigateBack()
      },
      fail (e) {
        console.log('error')
        console.error(e)
      }
    })
  }
})
