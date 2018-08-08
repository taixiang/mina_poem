var constant = require('../../utils/constant');
var type = 0; //类别0--诗  1--词
var id ;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null,
    hiddenmodalput:true,
    value:"", //输入内容
    initVal:"",//初始化内容
  },


  /**
   * 监听输入的字
   */
  bindKeyInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },

  /**
   * 弹出框
   */
  showError:function(e){
    this.setData({
      hiddenmodalput:false
    })
  },

  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    console.log("66666666666")
    if(!this.data.value){
      console.log(this.data.value)
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
      
    }

    var data={};
    data.openId = app.globalData.openId
    data.pId = this.data.detail.id
    data.content = this.data.value
    data.type = type
    postError(this, data)

    this.setData({
      hiddenmodalput: true
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id;
    type = options.type;
    console.log(options)
    getData(this, id)
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
    id = ""
    type =0
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


/**
   * 网络请求
   */
function getData(that, id) {
  var url = "";
  if (type == 0) {
    url = constant.poetryDetail  + id
  } else {
    url = constant.poemDetail + id
  }

  wx.request({
    url: url,
    success: function (res) {
      console.log("====成功")
      console.log(res)
      if (res.data != null && res.data.code == 200) {
        that.setData({
          detail: res.data.results,
        })
      }
    },
    fail: function (res) {
      console.log("====失败")
      // console.log(res)
    },
    complete: function (res) {
      console.log("====完成")
      
    }
  })
}

/**
 * 纠错
 */
function postError(that,data){
  console.log(data)
  wx.request({
    url: constant.postError,
    method: 'POST',
    data: data,
    success: function (res) {
      var json = JSON.parse(res.data)
      if(json.code == 200){
        wx.showToast({
          title: json.result,
        })

        that.setData({
          initVal: ""
        })


      }
      

    },
    fail:function(res){
      this.setData({
      initVal: ""
    })

    }
  })
}