var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var common = require('../../utils/common.js');
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    tabs: ["全部", "超市", "娱乐", "美食"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    shopList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    goodsList: [{}],
    bigGoodsList:[{},{},{},{}],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    headerPush: [
      '1分钟前 用户 188****1922 兑换了20惠币',
      '1分钟前 用户 赛** 兑换了一张星巴克咖啡兑换券',
      '1分钟前 用户 177****0987 兑换了一张星巴克咖啡兑换券',
      '1分钟前 用户 189****9113 兑换了一张星巴克咖啡兑换券',
      '1分钟前 用户 雷** 兑换了一张购百特10元代金券'
    ]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  openShopIndex: function (e) {
    wx.navigateTo({
      url: "../goods_index/goods_index"
    })
  },
  openLbsList: function (e) {
    wx.navigateTo({
      url: "../lbs_list/lbs_list"
    })
  },
  openIntegral: function (e) {
    wx.navigateTo({
      url: "../integral/integral"
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  openGoodsList: function (e) {
    wx.navigateTo({
      url: "../goods_list/goods_list?id="+e.currentTarget.dataset.lanmu
    })
  },
  doGPS: function () {
    wx.setNavigationBarTitle({
      title: '小云积分|定位中...'
    })
    common.getLocation();
  }
});