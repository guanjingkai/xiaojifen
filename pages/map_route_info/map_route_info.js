var amapFile = require('../../utils/amap-wx.js');
var config = require('../../utils/config.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function (option) {
    var thisid = option.id;
    if (thisid == 0) {
      this.setWalk();
    } else if (thisid == 1) {
      this.setCar();
    } else if (thisid == 2) {
      this.setRide();
    }
  },
  setWalk: function () {
    var that = this;
    var key = config.Config.amapKey;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getWalkingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function (data) {
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          that.setData({
            steps: data.paths[0].steps
          });
        }

      },
      fail: function (info) {

      }
    })
  },
  setRide: function () {
    var that = this;
    var key = config.Config.amapKey;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRidingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function (data) {
        if (data.paths && data.paths[0] && data.paths[0].rides) {
          that.setData({
            steps: data.paths[0].rides
          });
        }

      },
      fail: function (info) {

      }
    })
  },
  setCar: function () {
    var that = this;
    var key = config.Config.amapKey;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getDrivingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function (data) {
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          that.setData({
            steps: data.paths[0].steps
          });
        }

      },
      fail: function (info) {

      }
    })
  }
})