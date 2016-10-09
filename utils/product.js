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

function postBuyProduct (data) {
  return new Promise((resolve, reject) => {
    wx.request({
        url: `${API_URL}/products/buy`,
        data: Object.assign({}, data),
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
      url: `${API_URL}/cart/billing`,
      data: data,
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
  getProduct (data) {
    return getProducts(data)
  },

  getSlides () {
    return getSlides()
  },

  postBilling (data) {
    return postBilling(data)
  }
}
