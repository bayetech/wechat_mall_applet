const app = getApp()

function getAsset (data, resolve) {
  wx.request({
    url: `${app.globalData.API_URL}/my_assets/${data}`,
    header: { 'Content-Type': 'application/json' },
    success: resolve,
    fail: function(){}
  })
}


module.exports = {
  getAsset (resolve) {
    return getAsset(resolve)
  }
}
