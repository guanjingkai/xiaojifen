//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log('session未过期')
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              console.log('获取用户登录态成功！')
              console.log(res)
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });

      }
    })
    wx.removeStorage({
      key: 'location',
      success: function (res) {
        
      }
    })
    this.doGPS();
    
  },
  onShow: function () {
    try {
      var value = wx.getStorageSync('location')
      if (value) {
        wx.setNavigationBarTitle({
          title: '小云积分|' + value
        })
      }
    } catch (e) {
      this.doGPS();
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  },
  doGPS: function () {
    wx.setNavigationBarTitle({
      title: '小云积分|定位中...'
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var bmap = require('./utils/bmap-wx.min.js')
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
})
