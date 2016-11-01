var app = getApp()
const profile = require('../../utils/profile.js')


Page({
  data: {
    userInfo: null,
    zichan_slides: []
  },

  onShow: function() {
  },

  onLoad: function() {
    var that = this
    app.getUserInfo(function(userInfo){
      that.setData({userInfo:userInfo})
    })

    profile.getZichanSlides({}, function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({'zichan_slides': data})
      wx.setStorage({
        key:"zichan_slides",
        data:data
      })
    })
  },
})