const district = require('../../utils/address_data.js')
const order = require('../../utils/order.js')
const pay = require('../../utils/pay.js')


Page({
  data: {
    wantToDeleteItem: '',
    address: null,
    cartItems: [],
    amount: 0
  },

  onLoad: function (params) {
  },

  onShow: function (params) {
    var cartItems = wx.getStorageSync("cartItems")
    this.setData({cartItems: cartItems || []})

    this.changeCartAmount()

    var detailAddress  = wx.getStorageSync('detailAddress')
    var receiverName   = wx.getStorageSync('receiverName')
    var receiverMobile = wx.getStorageSync('receiverMobile')
    var address = {detail_address: detailAddress, customer_name: receiverName, customer_mobile: receiverMobile}

    var districtIndex = wx.getStorageSync('currentDistrict') || [0,0,0]
    address.province = district.provinces()[districtIndex[0]]
    address.city     = district.cities(address.province)[districtIndex[1]]
    address.county   = district.counties(address.province, address.city)[districtIndex[2]]

    this.setData({address: address})
  },

  bindSelectCoupon: function() {
    wx.navigateTo({
      url: `coupon`
    })
  },

  bindChangeQuantity: function (e) {
    var cartItems = this.data.cartItems
    var item = cartItems.filter(function(ele){
      return ele.id === e.currentTarget.dataset.id
    })[0]
    item.quantity = e.detail.value
    this.setData({ cartItems: cartItems })
    wx.setStorage({
      key: 'cartItems',
      data: cartItems
    })
    this.changeCartAmount()
  },

  // tap on item to delete cart item
  catchTapOnItem: function (e) {
    var that = this
    this.setData({
      wantToDeleteItem: e.currentTarget.dataset.id
    })

    wx.showModal({
      title: '删除商品',
      content: '是否要删除购物车中的这件商品？',
      confirmText: '删除',
      cancelText: '别删',
      success: function(res) {
        if (res.confirm) {
          var cartItems = that.data.cartItems
          var index = cartItems.findIndex(function(ele){
            return ele.id === that.data.wantToDeleteItem
          })
          cartItems.splice(index, 1)
          that.setData({ cartItems: cartItems })
          wx.setStorage({
            key: 'cartItems',
            data: cartItems
          })
          that.changeCartAmount()
        }
      }
    })
  },

  bindBilling: function () {
    var cartItems = wx.getStorageSync('cartItems')
    if (cartItems) {
      var order_items_attributes = cartItems.map(function(obj){
        var rObj = {};
        rObj['product_uid'] = obj.product.uid
        rObj['quantity'] = parseInt(obj.quantity)
        rObj['shippment_type'] = '包邮'
        // rObj['external_content'] = ""
        return rObj
      })

      var params = this.data.address
      params['order_from'] = 'from_applet'
      params['order_items'] = order_items_attributes

      order.postBilling(params, function(result){
        pay.pay(result.data.hash)
      })
    }
  },

  changeCartAmount: function () {
    var amount = 0
    this.data.cartItems.forEach(function(entry){
      amount += entry.quantity * entry.product.price
    })
    this.setData({amount: amount})
  },

  bindTapAddress () {
    wx.navigateTo({
      url: '../address/address'
    })
  }
})
