var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  openShopIndex: function (e) {
    wx.navigateTo({
      url: "../goods_index/goods_index"
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
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var bmap = require('../../utils/bmap-wx.min.js')
        var BMap = new bmap.BMapWX({
          ak: 'a1ydgGv9i906zihIlzMNWkw441hMZgZH'
        })
        BMap.regeocoding({
          fail: function (data) {
            console.log(data)
          },
          success: function (data) {
            //删掉省市区
            var location = data.wxMarkerData[0].address.slice(data.originalData.result.addressComponent.city.length + data.originalData.result.addressComponent.district.length);
            wx.setStorage({
              key: "location",
              data: location
            })
            wx.setNavigationBarTitle({
              title: '小云积分|' + location
            })
          }
        });

        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res);
      }
    })
  }
});