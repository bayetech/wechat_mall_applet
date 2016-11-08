const app = getApp()

function getZichanSlides (resolve) {
  wx.request({
    url: `${app.globalData.API_URL}/profiles/zichan_sildes`,
    data: {token: app.globalData.token},
    header: { 'Content-Type': 'application/json'},
    success: resolve,
    fail: function(){}
  })
}

function getCustomerInfo (data, cb) {
  data['code'] = app.globalData.code
  data['name'] = app.globalData.userInfo.nickName
  wx.request({
    url: `${app.globalData.API_URL}/sessions/new`,
    header: { 'Content-Type': 'application/json'},
    data: data,
    success: function(res) {
      app.globalData.currentCustomer = res.data.customer
      app.globalData.token = res.data.token
      typeof cb == "function" && cb(app.globalData.currentCustomer)
    },
    fail: function(res) {
    }
  })
}

function getPassCode (mobile) {
  wx.request({
    url: `${app.globalData.API_URL}/profile/send_pass_code`,
    header: { 'Content-Type': 'application/json'},
    data: {
      mobile: mobile
    },
    success: function(res) {
      
    },
    fail: function(res) {
    }
  })
}

module.exports = {
  getZichanSlides (resolve) {
    return getZichanSlides(resolve)
  },
  getCustomerInfo (resolve) {
    return getCustomerInfo(resolve)
  },
  getPassCode (mobile) {
    return getPassCode(mobile)
  }
}