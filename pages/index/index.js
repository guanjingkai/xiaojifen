var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    tabs: ["全部", "超市", "娱乐", "美食"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    shopList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
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
    duration: 1000
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  openShopIndex: function (e) {
    wx.navigateTo({
      url: "../shop_index/shop_index"
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
  }
});