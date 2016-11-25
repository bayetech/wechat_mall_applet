const jsonApi = require('utils/jsonapi-datastore/dist/jsonapi-datastore.js')
require('utils/polyfill.js')

App({
  onLaunch: function () {
    this.store = new(jsonApi.JsonApiDataStore)
    this.jsonModel = jsonApi.JsonApiDataStoreModel
    this.globalData.code = wx.getStorageSync('code')
  },

  getUserInfo: function (cb) {
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success: function (res) {
          if (res.code) {
            that.globalData.code = res.code
            wx.setStorageSync('code', res.code)
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },

  request: function(obj) {
    var header = obj.header || {}
    if (!header['Content-Type']) {
      header['Content-Type'] = 'application/json'
    }
    if (!header['Authorization']) {
      header['Authorization'] = getApp().globalData.token
    }

    // This must be wx.request !
    wx.request({
      url: obj.url,
      data: obj.data || {},
      method: obj.method || 'GET',
      header: header,
      success: function(res) {
        typeof obj.success == "function" && obj.success(res)
      },
      fail: obj.fail || function() {},
      complete: obj.complete || function() {}
    })
  },

  authRequest: function(obj) {
    var that = this
    if (!that.globalData.token) {
      var token = wx.getStorageSync('userToken')
      that.globalData.token = token
      that.request({
        url: `${that.globalData.API_URL}/sessions/new`,
        data: {code: that.globalData.code},
        success: function(res) {
          if (!res.data.token) {
            wx.navigateTo({
              url: '../mine/mine',
              success: function(res){},
              fail: function() {},
              complete: function() {}
            })
          } else {
            that.globalData.currentCustomer = res.data.customer
            that.globalData.token = res.data.token
            wx.setStorage({
              key: 'userToken',
              data: res.data.token
            })
            that.request(obj)
          }
        },
        fail: function(res) {}
      })
    } else {
      that.request(obj)
    }
  },

  globalData:{
    userInfo: null,
    currentCustomer: null,
    // API_URL: 'http://localhost:3000',
    API_URL: 'https://rapi-staging.bayekeji.com'
  }
})
