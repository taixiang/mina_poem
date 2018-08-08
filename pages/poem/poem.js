var constant = require('../../utils/constant');
const app = getApp()
var type= 0; //类别0--诗  1--词
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    hasNext: false,
    page: 1,
    loadingTxt: "", //加载提示
    isLoading: false, //防止延迟多次加载
    
    value:"", //搜索的字
  },

  /**
   * 监听输入的字
   */
  bindKeyInput:function(e){
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },

  /**
   * 搜索
   */
  search:function(e){
    // if(!this.data.value){
    //   console.log(this.data.value)
    //   wx.showToast({
    //     title: '请输入内容',
    //     icon: 'none'
    //   })
    //   return
    // }

    wx.showLoading({
      title: '正在加载',
    })
    this.data.list = [];
    this.data.page = 1;
    getData(this, this.data.page, false, this.data.value)

    if(this.data.value.trim().length > 0){
      var data = {}
      data.content = this.data.value
      data.openId = app.globalData.openId
      data.type = type
      postSearch(this,data)
    }

  },

  /**
   * 详情页
   */
  toDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id +"&type="+type,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    type = options.type;
    wx.showLoading({
      title: '正在加载',
    })
    getData(this, this.data.page, false, this.data.value)

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
    type = 0;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.list = [];
    this.data.page = 1;
    getData(this, 1, true, this.data.value)
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
      getData(this, this.data.page, false, this.data.value)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})






/**
   * 网络请求
   */
function getData(that, page, isrefresh, value) {
  var url = "";
  if (type==0){
    url = constant.poetryList + "?page=" + page + "&name=" + value
  }else{
    url = constant.poemList + "?page=" + page + "&name=" + value
  }

  wx.request({
    url: url,
    success: function (res) {
      console.log("====成功")
      console.log(res)
      if (res.data != null && res.data.code == 200) {
        that.setData({
          list: that.data.list.concat(res.data.results),
          hasNext: res.data.next != null ? true : false,
          page: res.data.next != null ? that.data.page += 1 : that.data.page,
          loadingTxt: res.data.next != null ? "" : "已全部加载!",
        })
      }
    },
    fail: function (res) {
      console.log("====失败")
      // console.log(res)
    },
    complete: function (res) {
      console.log("====完成")
      wx.hideLoading()
      if (isrefresh) {
        wx.stopPullDownRefresh();
      }
      that.setData({
        isLoading: false
      })
    }
  })
}

/**
 * 搜索
 */
function postSearch(that, data) {
  console.log(data)
  wx.request({
    url: constant.postSearch,
    method: 'POST',
    data: data,
    success: function (res) {
    

    },
    fail: function (res) {
      

    }
  })
}