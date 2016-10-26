const API_URL = 'http://localhost:3000'

function postBilling (data, resolve) {
  wx.request({
    method: 'POST',
    url: `${API_URL}/orders`,
    data: data,
    header: { 'Content-Type': 'application/json'},
    success: resolve,
    fail: function(){}
  })
}

module.exports = {
  postBilling (data, resolve) {
    return postBilling(data, resolve)
  }
}