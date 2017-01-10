const app = getApp()

function getZichanSlides (resolve) {
  app.authRequest({
    url: `${app.globalData.API_URL}/my_assets`,
    header: { 'Content-Type': 'application/json'},
    success: resolve,
    fail: function(){}
  })
}

function postCustomerInfo (data, cb) {
  data['code'] = app.globalData.code
  data['encrypted'] = app.globalData.encrypted
  app.request({
    url: `${app.globalData.API_URL}/sessions/login`,
    method: 'POST',
    data: data,
    success: function(res) {
      if (res.data.code === 4) {
        return
      } else if (parseInt(res.statusCode) === 403) {
        wx.showModal({
          title: '错误',
          content: `${res.data.msg}`,
          showCancel: false,
          success: function(res) {
          }
        })
        wx.hideToast()
        return
      }
      var pages = getCurrentPages()
      pages[pages.length-1].setData({needBindMobile: false})
      app.globalData.currentCustomer = res.data.customer
      app.globalData.token = res.data.token
      wx.setStorage({
        key: 'userToken',
        data: res.data.token
      })
      typeof cb == "function" && cb(app.globalData.currentCustomer)
    },
    fail: function(res) {
    }
  })
}

function getPassCode (mobile, cb) {
  app.request({
    url: `${app.globalData.API_URL}/send_validation_code/send_message`,
    header: { 'Content-Type': 'application/json'},
    data: {
      mobile: mobile
    },
    success: cb,
    fail: function(res) {
    }
  })
}

function postEncryptedData (resolve) {
  var app = getApp()
  app.request({
    method: 'POST',
    url: `${app.globalData.API_URL}/sessions/wechat_user_type`,
    data: {
      code: app.globalData.code,
      encrypted: app.globalData.encrypted,
      userInfo: app.globalData.userInfo
    },
    success: resolve,
    fail: function(res) {}
  })
}

module.exports = {
  getZichanSlides (resolve) {
    return getZichanSlides(resolve)
  },
  postCustomerInfo (data, resolve) {
    return postCustomerInfo(data, resolve)
  },
  getPassCode (mobile, cb) {
    return getPassCode(mobile, cb)
  },

  postEncryptedData (resolve) {
    return postEncryptedData(resolve)
  }
}