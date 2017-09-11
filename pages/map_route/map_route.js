// pages/map_route/map_route.js
var common = require('../../utils/common.js');
var config = require('../../utils/config.js');
var amapFile = require('../../utils/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["步行", "驾车", "骑行", "公交"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    zLatitude: '',
    zLongitude: '',
    myLatitude: '',
    myLongitude: '',
    markers: [{
      iconPath: "../../image/icon/mapicon_navi_s.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.481028,
      width: 23,
      height: 33
    }, {
      iconPath: "../../image/icon/mapicon_navi_e.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: [],
    scale:15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _self = this;
    var latitude;
    var longitude;
    var zlatitude = (_self.data.latitude + _self.data.markers[1].latitude) / 2;
    var zlongitude = (_self.data.longitude + _self.data.markers[1].longitude) / 2;
    console.log(zlatitude)
    console.log(zlongitude)
    wx.getStorage({
      key: 'latitude',
      success: function (res) {
        latitude = res.data;
        wx.getStorage({
          key: 'longitude',
          success: function (res) {
            longitude = res.data;
            console.log(latitude);
            console.log(longitude);
            _self.setData({
              'markers[0].latitude': latitude,
              'markers[0].longitude': longitude,
              myLatitude: latitude,
              myLongitude: longitude,
              zLatitude: zlatitude,
              zLongitude: zlongitude
            });
            //计算中心坐标
            _self.setWalk();
          }
        })
      }
    })
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  tabClick: function (e) {
    var thisid = e.currentTarget.id;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (thisid == 0){
      this.setWalk();
    } else if (thisid == 1){
      this.setCar();
    } else if (thisid == 2){
      this.setRide();
    } else if (thisid == 3){
      this.setBus();
    }
  },
  setWalk:function(){
    var _self = this;
    var key = config.Config.amapKey;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getWalkingRoute({
      origin: _self.data.myLongitude + ',' + _self.data.myLatitude,
      destination: '116.434446,39.90816',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        _self.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          _self.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.paths[0] && data.paths[0].duration) {
          _self.setData({
            cost: parseInt(data.paths[0].duration / 60) + '分钟'
          });
        }

      },
      fail: function (info) {

      }
    })
  },
  setCar: function () {
    var _self = this;
    var key = config.Config.amapKey;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getDrivingRoute({
      origin: _self.data.myLongitude + ',' + _self.data.myLatitude,
      destination: '116.434446,39.90816',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        _self.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          _self.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          _self.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }

      }
    })
  },
  setBus: function () {
    var _self = this;
    var key = config.Config.amapKey;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getTransitRoute({
      origin: _self.data.myLongitude + ',' + _self.data.myLatitude,
      destination: '116.434446,39.90816',
      city: '北京',
      success: function (data) {
        if (data && data.transits) {
          var transits = data.transits;
          for (var i = 0; i < transits.length; i++) {
            var segments = transits[i].segments;
            transits[i].transport = [];
            for (var j = 0; j < segments.length; j++) {
              if (segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name) {
                var name = segments[j].bus.buslines[0].name
                if (j !== 0) {
                  name = '--' + name;
                }
                transits[i].transport.push(name);
              }
            }
          }
        }
        _self.setData({
          transits: transits
        });

      },
      fail: function (info) {

      }
    })
  },
  setRide: function () {
    var _self = this;
    var key = config.Config.amapKey;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRidingRoute({
      origin: _self.data.myLongitude + ',' + _self.data.myLatitude,
      destination: '116.434446,39.90816',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].rides) {
          var steps = data.paths[0].rides;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        _self.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          _self.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          _self.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }

      },
      fail: function (info) {

      }
    })
  },
  seeInfo: function (e) {
    wx.navigateTo({
      url: "../map_route_info/map_route_info?id=" + e.currentTarget.dataset.type
    })
  }
})