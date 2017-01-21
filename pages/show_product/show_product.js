const productUtil = require('../../utils/product.js')
var app = getApp()
Page({
  data: {
    title: '',
    id: 0,
    quantity: 1,
    product: {},
    windowWidth: 375,
    windowHeight: 667,
    pixelRatio: 2,
    accountType: '',
    from_share: false,

    codeFloating: {
      data: {},
      style: {
        width: 100,
        height: 100
      },
      pos: {
        left: 650,
        top: 650
      },
      state: 'small',
      url: '',
      imgStyle: ''
    }
  },

  onShareAppMessage: function () {
    return {
      title: this.data.product.name,
      desc: "巴爷供销社 － 高品质购物",
      path: `pages/show_product/show_product?id=${this.data.product.id}&share=1`
    }
  },

  onLoad (params) {
    var that = this
    var id = params.id

    try {
      var res = wx.getSystemInfoSync()
      this.setData({
        windowWidth:  res.windowWidth,
        windowHeight: res.windowHeight,
        pixelRatio:   res.pixelRatio
      })
      app.globalData.windowWidth  = res.windowWidth
      app.globalData.windowHeight = res.windowHeight
      app.globalData.pixelRatio   = res.pixelRatio
    } catch (e) {
    }

    if (params.share) {
      productUtil.getProduct(id, function(result){
        var data = app.store.sync(result.data)
        that.setData({
          from_share: true,
          id: data.id,
          product: data,
          title: data.name
        })
      })
    } else {
      var allProducts
      if (params.type) {
        allProducts = wx.getStorageSync(`cate_${params.type}`)
      } else {
        allProducts = wx.getStorageSync('products')
      }
      var id = params.id
      var product = allProducts.filter(function(i){
        return i.id === id
      })[0]

      this.setData({
        from_share: false,
        id: id,
        product: product,
        title: product.name
      })
    }

    var reqPath = {path: `pages/show_product/show_product?id=${this.data.product.id}&share=1`}
    productUtil.getProductPageQrCode(reqPath, function(resp){
      that.setData({'codeFloating.url': resp.data.url})
    })
  },

  onShow() {
    if (app.globalData.currentCustomer) {
      var accountType = app.globalData.currentCustomer.account_type
      this.setData({accountType: accountType})
    }
  },

  onReady() {
    wx.setNavigationBarTitle({ title: this.data.title })
  },

  bindAddToCart (e) {
    var that = this

    //管到屏蔽
    if (!app.globalData.featureManager.enableGuanDao) {
      if (this.data.product && (parseInt(this.data.product['category-id']) === 18)) {
        wx.showModal({
          title: '管到商品暂未开放',
          content: '目前无法在小程序上购买管到商品，如有需要，可以在巴爷微信商城上进行购买。',
          showCancel: false,
          success: function(res) {}
        })
        return
      }
    }

    var cartItems = wx.getStorageSync('cartItems') || []

    var exist = cartItems.filter(function(ele){
      return ele.id === that.data.id
    })[0]

    if (exist) {
      exist.quantity = parseInt(exist.quantity) + 1
    } else {
      cartItems.push({
        id: this.data.id,
        quantity: 1,
        product: this.data.product
      })
    }
    wx.showToast({
      title: '成功加入',
      icon: 'success',
      duration: 1000
    })
    wx.setStorage({
      key: 'cartItems',
      data: cartItems
    })

    if (this.data.from_share) {
      wx.switchTab({
        url: '../cart/cart'
      })
    }
  },

  changeCodeState: function (e) {
    var ratio = 750 / this.data.windowWidth
    var eleStyle = this.data.codeFloating.style
    var pos = e.touches[0]

    var eleLeft = pos.clientX - eleStyle.width / ratio / 2
    var eleTop = pos.clientY - eleStyle.height / ratio / 2

    if (pos.clientX <= eleStyle.width / ratio / 2) {
      eleLeft = 0
    } else if (pos.clientX + eleStyle.width / ratio / 2 > this.data.windowWidth) {
      eleLeft = this.data.windowWidth - eleStyle.width / 2
    } else if (pos.clientY + eleStyle.height / ratio / 2 > this.data.windowHeight) {
      eleTop = this.data.windowHeight - eleStyle.height / 2
    } else if (pos.clientY <= eleStyle.height / ratio / 2) {
      eleTop = 0
    }

    eleLeft = eleLeft * ratio
    eleTop  = eleTop * ratio

    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'step-start',
    })
    animation.left(`${eleLeft}rpx`).top(`${eleTop}rpx`).step()
    this.setData({
      'codeFloating.data': animation.export(),
      'codeFloating.pos': {left: eleLeft, top: eleTop}
    })
  },

  catchScaleCode: function (e) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    })

    var state, width
    if (this.data.codeFloating.state == "small") {
      width = "750rpx"
      state = 'big'
      animation.left(0).top('100rpx').width(width).height(width).step()
    } else {
      width = "100rpx"
      let pos = this.data.codeFloating.pos
      state = 'small'
      animation.left(`${pos.left}rpx`).top(`${pos.top}rpx`).width(width).height(width).step()
    }

    this.setData({
      'codeFloating.data': animation.export(),
      'codeFloating.state': state,
      'codeFloating.imgStyle': `width: ${width}; height: ${width};`
    })
  }
})
