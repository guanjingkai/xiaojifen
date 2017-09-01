// msg_success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  goQcode: function () {
    wx.navigateTo({
      url: '../show_card/show_card'
    })
  },
  look: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  }
})