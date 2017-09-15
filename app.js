//app.js
var common = require('./utils/common.js');
App({
  onLaunch: function () {
    var _self = this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log('session未过期');
        wx.login({
          success: function (res) {
            if (res.code) {
              //
              _self.getUserInfo();
              _self.getOpenId();
              console.log('获取用户登录态成功！')
              console.log(res)
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
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
  getUserInfo: function () {
    var that = this
    if (this.globalData.userInfo) {
      //typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          //typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  getOpenId:function(code){
    wx.request({
      url: 'https://server.chungold.com:7002/crm/user/login/wxxcx', //仅为示例，并非真实的接口地址
      data: {
        code:code,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  globalData: {
    userInfo: null
  },
  doGPS: function () {
    wx.setNavigationBarTitle({
      title: '小云积分|定位中...'
    })
    common.getLocation();
  }
})
