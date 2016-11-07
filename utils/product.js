const API_URL = 'https://rapi.bayekeji.com'

function getProducts (resolve) {
  wx.request({
    url: `${API_URL}/products`,
    header: { 'Content-Type': 'application/json' },
    success: resolve,
    fail: function(){}
  })
}

function getSlides (resolve) {
  wx.request({
    url: `${API_URL}/home_slides`,
    header: { 'Content-Type': 'application/json' },
    success: resolve,
    fail: function(){}
  })
}

function getCategories (data, resolve, reject) {
  wx.request({
    url: `${API_URL}/products?type=${data}`,
    header: { 'Content-Type': 'application/json'},
    success: resolve,
    fail: reject
  })
}


module.exports = {
  getProducts (resolve) {
    return getProducts(resolve)
  },

  getSlides (resolve) {
    return getSlides(resolve)
  },

  getCategories (data, resolve, reject) {
    return getCategories(data, resolve, reject)
  }
}
