var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["全部", "超市", "娱乐", "美食"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    shopList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    goodsList: [{}, {}]
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
  openShopIndex: function(e){
    wx.navigateTo({
      url: "../shop_index/shop_index"
    })
  }
});