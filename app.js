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
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                that.globalData.code = res.code
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

  getCustomerInfo: function (cb) {
    var that = this
    wx.request({
      url: 'http://localhost:3000/sessions/new',
      header: { 'Content-Type': 'application/json'},
      data: {
        code: 'sadjfskdf',
        mobile: '13054277777',
        name: 'test'
      },
      success: function(res) {
        that.globalData.currentCustomer = res.data.customer
        that.globalData.token = res.data.token
        typeof cb == "function" && cb(that.globalData.currentCustomer)
      },
      fail: function(res) {
      }
    })
  },
  

  globalData:{
    userInfo: null,
    currentCustomer: null
  }
})
