//logs.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["选项一", "选项二", "选项三"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0
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
  openGoodsList: function (e) {
    wx.navigateTo({
      url: "../goods_list/goods_list?id=" + e.currentTarget.dataset.lanmu
    })
  },
  openExchangeRecord: function (e) {
    wx.navigateTo({
      url: "../exchange_record/exchange_record"
    })
  },
  openImportRecord: function (e) {
    wx.navigateTo({
      url: "../import_record/import_record"
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});