//app.js
var constant = require('./utils/constant.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log("登录")
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        getOpenId(this, res.code)

      },
      fail:function(res){
        getInfo(this)
      }
    })
    
  },
  globalData: {
    userInfo: {},
    openId: "",
  }
})



/**
   * 网络请求openid
   */
function getOpenId(that, jscode) {
  wx.request({
    url: constant.getOpenId + jscode,
    success: function (res) {
      console.log("openid")
      console.log(res)
      var result = JSON.parse(res.data)
      console.log(result.openid)
      that.globalData.openId = result.openid
      
    },
    fail: function (res) {

    },
    complete:function(){
      console.log("completet")
      getInfo(that)
    }

  })
}

function getInfo(that){
  // 获取用户信息
  wx.getSetting({
    success: res => {

      console.log(res)

      // if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            that.globalData.userInfo = res.userInfo
            that.globalData.userInfo.openId = that.globalData.openId

            console.log("用户信息")
            console.log(that.globalData.userInfo)

            postInfo(that.globalData.userInfo)

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (that.userInfoReadyCallback) {
              that.userInfoReadyCallback(res)
            }
          },
          fail:function(res){
            console.log(res)
            that.globalData.userInfo.openId
            that.globalData.userInfo.openId = that.globalData.openId
            postInfo(that.globalData.userInfo)

          }
        })
      }
    // }
  })
}


function postInfo(data){
  wx.request({
    url: constant.postUserInfo,
    method:'POST',
    data:data,
    success:function(res){

    }
  })
}