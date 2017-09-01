Page({
  data: {
    bigGoodsList: [{}, {}, {}, {}]
  },
  onLoad: function () {
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    });
  },
  likeSuccess: function () {
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 1000
    });
  },
  openConfirmExchange: function () {
    wx.showModal({
      title: '兑换确认',
      content: '您确认使用10惠币兑换星巴克拿铁大杯咖啡么',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.navigateTo({
            url: '../msg_success/msg_success'
          })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  }
});