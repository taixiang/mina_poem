var constant = require('../../utils/constant');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    hasNext: false,
    page: 1,
    loadingTxt: "", //加载提示
    isLoading: false, //防止延迟多次加载


  },


  /**
   * 详情页
   */
  toDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../errorDetail/errorDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getData(this, this.data.page)
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
    if (this.data.hasNext && !this.data.isLoading) {
      this.setData({
        loadingTxt: "正在加载",
        isLoading: true
      })
      getData(this, this.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

function getData(that, page){
  wx.request({
    url: constant.getMyError + "?openId=" + app.globalData.openId + "&page=" + page,
    success:function(res){
      console.log(res)
      that.setData({
        list: that.data.list.concat(res.data.results),
        hasNext: res.data.next != null ? true : false,
        page: res.data.next != null ? that.data.page += 1 : that.data.page,
        loadingTxt: res.data.next != null ? "" : "已全部加载!",
      })
    },
    fail:function(){

    }
  })

}