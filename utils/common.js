var config = require('./config.js');
var amapFile = require('./amap-wx.js')

var getLocation = function(){
  config.Config.amapKey;
  var myAmapFun = new amapFile.AMapWX({ key: config.Config.amapKey });
  myAmapFun.getRegeo({
    success: function (data) {
      //成功回调
      console.log('高德')
      console.log(data)
      var location = data[0].name.slice(data[0].regeocodeData.addressComponent.district.length);
      wx.setStorage({
        key: "location",
        data: location
      });
      wx.setStorage({
        key: "latitude",
        data: data[0].latitude
      });
      wx.setStorage({
        key: "longitude",
        data: data[0].longitude
      });
      wx.setNavigationBarTitle({
        title: '小云积分|' + location
      })
    },
    fail: function (info) {
      //失败回调
      console.log(info)
    }
  })
}

module.exports.getLocation = getLocation;