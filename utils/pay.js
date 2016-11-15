function pay(hash) {
  wx.requestPayment({
    'appId':     hash.appId,
    'timeStamp': hash.timeStamp,
    'nonceStr':  hash.nonceStr,
    'package':   hash.package,
    'signType':  hash.signType,
    'paySign':   hash.signature,
    'success': function(res){
    },
    'fail': function(res){
    }
  })
}
module.exports = {
  pay (hash) {
    return pay(hash)
  }
}
