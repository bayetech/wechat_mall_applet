const app = getApp()

function getAsset (sku, resolve) {
  app.request({
    url: `${app.globalData.API_URL}/my_assets/${sku}`,
    success: resolve,
    fail: function(){}
  })
}


module.exports = {
  getAsset(sku, resolve) {
    return getAsset(sku, resolve)
  }
}
