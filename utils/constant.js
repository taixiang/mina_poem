var baseUrl = "https://www.manjiexiang.cn/";
module.exports = {
  getOpenId: baseUrl.concat('poem/getOpenId?code='), //openid
  postUserInfo: baseUrl.concat('poem/postUserInfo'),//用户信息
  poetryList: baseUrl.concat('api/poetry/'), //诗
  poemList: baseUrl.concat('api/poem/'), //词
  poetryDetail: baseUrl.concat('api/poetrydetail/'),
  poemDetail: baseUrl.concat('api/poemdetail/'),
  postSearch: baseUrl.concat('poem/postSearch'), //搜索内容
  postError: baseUrl.concat('poem/postError'), //纠错
  getRecommend: baseUrl.concat('api/recommed'), //推荐
  getMyError: baseUrl.concat('api/myerror/'),//我的纠错

}