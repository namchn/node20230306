class user {
  constructor(isLogin, userInfo, userNm) {
    this.isLogin = isLogin;
    this.userInfo = userInfo;
    this.userNm = userNm;
  }

  getIsLogin() {
    return this.isLogin;
  }
  getUserInfo() {
    return this.userInfo;
  }
  getUserNm() {
    return this.userNm;
  }

  setIsLogin(isLogin) {
    this.isLogin = isLogin;
  }
  setUserInfo(userInfo) {
    this.userInfo = userInfo;
  }
  setUserNm(userNm) {
    this.userNm = userNm;
  }
}
module.exports = user;
