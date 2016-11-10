var app = getApp()
const profile = require('../../utils/profile.js')


Page({
  data: {
    needBindMobile: true,
    mobile: '',
    userInfo: null,
    zichan_slides: [],
    xunZhang: 'https://bayewechat.oss-cn-shanghai.aliyuncs.com/rassets/revision/' +
              'icon-medal-0-0c9193833e3a24dead6c39ba969c2e71eea1ba88b8ce88c3b76cd2b08804280d.png',
    baye_rank: null
  },

  onShow: function() {
  },

  onLoad: function() {
    var that = this
    var token = wx.getStorageSync('userToken')
    if (token) {
      that.setData({needBindMobile: false})
      var data = {token: token}
      profile.getCustomerInfo(data, that.infoCallback)
    }
    app.getUserInfo(function(userInfo){
      that.setData({userInfo:userInfo})
    })
  },

  bindGetPassCode: function(e) {
    this.setData({mobile: e.detail.value.mobile})
    profile.getPassCode(this.data.mobile)
  },

  bindSubmitMobile: function(e) {
    var data = {mobile: this.data.mobile, mobile_code: e.detail.value.code, name: app.globalData.userInfo.nickName}
    profile.getCustomerInfo(data, this.infoCallback)
  },

  infoCallback: function(currentCustomer) {
    var that = this
    var baye_rank = currentCustomer.baye_rank
    that.setData({baye_rank: baye_rank})

    profile.getZichanSlides(function(result) {
      debugger
      var data = getApp().store.sync(result.data)
      that.setData({'zichan_slides': data})
      wx.setStorage({
        key:"zichan_slides",
        data:data
      })
    })
  }

})