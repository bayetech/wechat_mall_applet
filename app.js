App({
  onLaunch: function () {
    const jsonApi = require('utils/jsonapi-datastore/dist/jsonapi-datastore.js')
    this.store = new(jsonApi.JsonApiDataStore)
    this.jsonModel = jsonApi.JsonApiDataStoreModel
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

  globalData:{
    userInfo: null,
    currentCustomer: null,
    API_URL: 'https://rapi-staging.bayekeji.com'
  }
})
