var app = getApp()
const profile = require('../../utils/profile.js')


Page({
  data: {
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
    app.getUserInfo(function(userInfo){
      that.setData({userInfo:userInfo})
      profile.getCustomerInfo(function(currentCustomer){
        var baye_rank = currentCustomer.baye_rank
        that.setData({baye_rank: baye_rank})

        profile.getZichanSlides(function(result) {
          var data = getApp().store.sync(result.data)
          that.setData({'zichan_slides': data})
          wx.setStorage({
            key:"zichan_slides",
            data:data
          })
        })
      })
    })
  },
})