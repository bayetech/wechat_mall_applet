const API_URL = 'http://localhost:3000'
const app = getApp()

function getZichanSlides (resolve) {
  wx.request({
    url: `${API_URL}/profiles/zichan_sildes`,
    data: {token: app.globalData.token},
    header: { 'Content-Type': 'application/json'},
    success: resolve,
    fail: function(){}
  })
}

function getCustomerInfo (cb) {
  wx.request({
    url: `${API_URL}/sessions/new`,
    header: { 'Content-Type': 'application/json'},
    data: {
      code: 'sadjfskdf',
      mobile: '13054277977',
      name: 'test'
    },
    success: function(res) {
      app.globalData.currentCustomer = res.data.customer
      app.globalData.token = res.data.token
      typeof cb == "function" && cb(app.globalData.currentCustomer)
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
  }
}