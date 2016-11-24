const app = getApp()

function getAsset (sku, resolve) {
  wx.request({
    url: `${app.globalData.API_URL}/my_assets/${sku}`,
    header: { 'Content-Type': 'application/json' },
    data: {token: app.globalData.token},
    success: resolve,
    fail: function(){}
  })
}


module.exports = {
  getAsset(sku, resolve) {
    return getAsset(sku, resolve)
  }
}
