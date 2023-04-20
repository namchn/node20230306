const moduleAlertMove = require("../util/alertMove"); //리다이렉트
const moduleLoginCheck = require("../login/login-check"); //세션체크

//* auth 세션 인증체크
const Auth = async (req, res, next) => {
  const { isLogin } = await moduleLoginCheck.loginCheck(
    null,
    null,
    req.session.user
  );
  //const { user } = req.session;
  //if (user != undefined) {
  if (isLogin) {
    console.log("good : " + isLogin);
    next();
  } else {
    //console.log(req.session);
    res.send(
      await moduleAlertMove.alertMove("로그인 후 사용해 주십시오.", "/")
    );
  }
};

module.exports = {
  Auth,
};
