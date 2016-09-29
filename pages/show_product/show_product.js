const app = getApp()

Page({
  data: {
    title: '',
    id: 0
  },

  onLoad (params) {
    this.data.id = params.id
  },

  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title })
  },

  bindTapAddress () {
    wx.navigateTo({
      url: '../address/address'
    })
  }
})
