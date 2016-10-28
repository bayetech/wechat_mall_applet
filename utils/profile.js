const API_URL = 'http://localhost:3000'

function getZichanSlides (resolve) {
  wx.request({
    url: `${API_URL}/profiles/zichan_sildes`,
    data: data,
    header: { 'Content-Type': 'application/json'},
    success: resolve,
    fail: function(){}
  })
}

module.exports = {
  getZichanSlides (resolve) {
    return getZichanSlides(resolve)
  }
}