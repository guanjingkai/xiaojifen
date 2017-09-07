// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    title1:'',
    title2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    if(id == 1){ 
      this.setData({
        title1:"小编推荐",
        title2:"小编为您精心挑选的优质商品"
      })
    } else if (id == 2) {
      this.setData({
        title1: "大家都在换",
        title2: "网罗附近兑换的人们商品"
      })
    } else if (id == 3) {
      this.setData({
        title1: "专属定制",
        title2: "最懂你的大数据分析"
      })
    } else if (id == 4) {
      this.setData({
        title1: "我的收藏",
        title2: "快导入积分兑换商品吧"
      })
    }
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
  
  }
})