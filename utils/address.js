const API_URL = 'https://api.bayekeji.com/v2'

function postAddress (data) {
  return new Promise((resolve, reject) => {
    wx.request({
        method: POST,
        url: `${API_URL}/addresses/new`,
        data: Object.assign({}, data),
        header: { 'Content-Type': 'application/json' },
        success: resolve,
        fail: reject
    })
  })
}

module.exports = {
  postAddress (data) {
    return postAddress(data).then(res => res.data)
  }
}