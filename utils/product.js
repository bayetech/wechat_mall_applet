const API_URL = 'http://localhost:3000'

function getProducts (data) {
  data = data ? `/${data}` : ''
  return new Promise((resolve, reject) => {
    wx.request({
        url: `${API_URL}/products${data}`,
        header: { 'Content-Type': 'application/json' },
        success: resolve,
        fail: reject
    })
  })
}

function getSlides () {
  return new Promise((resolve, reject) => {
    wx.request({
        url: `${API_URL}/home_slides`,
        header: { 'Content-Type': 'application/json' },
        success: resolve,
        fail: reject
    })
  })
}

function postBilling (data) {
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      url: `${API_URL}/carts/billings`,
      data: data,
      header: { 'Content-Type': 'application/json'},
      success: resolve,
      fail: reject
    })
  })
}

function getCategories (data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_URL}/products?category=${data}`,
      header: { 'Content-Type': 'application/json'},
      success: resolve,
      fail: reject
    })
  })
}


module.exports = {
  getProducts () {
    return getProducts()
  },

  getSlides () {
    return getSlides()
  },

  postBilling (data) {
    return postBilling(data)
  },

  getCategories (data) {
    return getCategories(data)
  }
}
