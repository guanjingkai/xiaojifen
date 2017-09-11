Page({
  data: {
    bigGoodsList: [{}, {}, {}, {}],
    markers: [{
      iconPath: "/image/icon/weizhi.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/image/demo/xingbake.jpeg',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  onLoad: function () {
    
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
          wx.addCard({
            cardList: [
              {
                cardId: 'IDpmiV8xB8flMfTjMTyxSrdklUN_fU',
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
              }
            ],
            success: function (res) {
              console.log(res.cardList) // 卡券添加结果
            },
            fail: function (res) {
              console.log(res) // 卡券添加结果
            }
          })
          wx.navigateTo({
            url: '../msg_success/msg_success'
          })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  openMap: function (e) {
    wx.navigateTo({
      url: "../map_route/map_route"
    })
  }
});