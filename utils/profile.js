const API_URL = 'http://localhost:3000'

function getZichanSlides (data, resolve) {
  wx.request({
    url: `${API_URL}/profiles/zichan_sildes`,
    data: data,
    header: { 'Content-Type': 'application/json'},
    success: resolve,
    fail: function(){}
  })
}

module.exports = {
  getZichanSlides (data, resolve) {
    return getZichanSlides(data, resolve)
  }
}