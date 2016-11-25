var app = getApp()
const profile = require('../../utils/profile.js')


Page({
  data: {
    needBindMobile: true,
    mobile: '',
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    zichan_slides: [],
    xunZhang: 'https://bayewechat.oss-cn-shanghai.aliyuncs.com/rassets/revision/' +
              'icon-medal-0-0c9193833e3a24dead6c39ba969c2e71eea1ba88b8ce88c3b76cd2b08804280d.png',
    baye_rank: null,
    disableGetMobileCode: false,
    disableSubmitMobileCode: true,
    getCodeButtonText: '获取验证码'
  },

  onShow: function() {
  },

  bindShowAsset: function (e) {
    wx.navigateTo({
      url: `../my_assets/show?sku=${e.currentTarget.dataset.sku}`
    })
  },

  onLoad: function() {
    var that = this
    if (app.globalData.token) {
      profile.getCustomerInfo({}, that.infoCallback)
    } else {
      var token = wx.getStorageSync('userToken')
      if (token) {
        app.globalData.token = token
        profile.getCustomerInfo({}, that.infoCallback)
      }
    }
    app.getUserInfo(function(userInfo){
      that.setData({userInfo: userInfo})
    })
  },

  bindGetPassCode: function(e) {
    var that = this
    this.setData({
      mobile: e.detail.value.mobile,
    })
    that.setData({disableGetMobileCode: true})
    profile.getPassCode(this.data.mobile, function(res) {
      if (res.data.code === 20001) {
        wx.showToast({
          title: `${res.data.message}`,
          icon: 'success',
          duration: 2000
        })
        that.countDownPassCode()
      } else {
        that.setData({disableGetMobileCode: false})
        wx.showToast({
          title: `${res.data.message}`,
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },

  countDownPassCode: function() {
    var pages = getCurrentPages()
    var i = 60
    var intervalId = setInterval(function(){
      i--
      if (i<=0) {
        pages[pages.length-1].setData({
          disableGetMobileCode: false,
          disableSubmitMobileCode: false,
          getCodeButtonText: '获取验证码'
        })
        clearInterval(intervalId)
      } else {
        pages[pages.length-1].setData({
          getCodeButtonText: i,
          disableGetMobileCode: true,
          disableSubmitMobileCode: false
        })
      }
    },1000);
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
      var data = getApp().store.sync(result.data)
      that.setData({'zichan_slides': data})
      wx.setStorage({
        key:"zichan_slides",
        data:data
      })
    })
  }

})