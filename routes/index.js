const express = require("express");
const router = express.Router();
const moduleAlertMove = require("../modules/util/alertMove");
const moduleLoginCheck = require("../modules/login/login-check");
//*cross-origin 요청: 다른 서버의 요청을 가능하게 함
const cors = require("cors"); //Cross-Origin Resource Sharing

//*기본주소
router.get("/", (req, res) => {
  //console.log("req.session : ");
  //console.log(req.session);
  res.redirect("/login/loginHome");
});

//*router
const customerRoute = require("./customer"); //cutomer라우트 추가
const productRoute = require("./product"); //product라우트 추가
const loginRoute = require("./login"); //product라우트 추가
const boardRoute = require("./board"); //board라우트 추가
const dailyRoute = require("./daily"); //daily라우트 추가
const functionRoute = require("./function"); //function라우트 추가
const testRoute = require("./test"); //test라우트 추가

//* auth 세션체크
const Auth = async (req, res, next) => {
  const { isLogin } = await moduleLoginCheck.loginCheck(
    "",
    "",
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

//*라우터 설정
router.use("/customer", customerRoute); //customer 라우트를 추가하고 기본경로로 /customer 사용
router.use("/product", productRoute); //product 라우트를 추가하고 기본경로로 /product 사용
router.use("/login", cors(), loginRoute); //login 라우트를 추가하고 기본경로로 /login 사용
router.use("/board", cors(), boardRoute); //board 라우트를 추가하고 기본경로로 /board 사용
router.use("/daily", cors(), Auth, dailyRoute); //daily 라우트를 추가하고 기본경로로 /daily 사용
router.use("/function", cors(), functionRoute); //function 라우트를 추가하고 기본경로로 /function 사용
router.use("/test", cors(), testRoute); //test 라우트를 추가하고 기본경로로 /test 사용

// *기본경로나 /사용 경로  가 아닌 잘못된 진입에 404 오류발생
router.use((req, res, next) => {
  res
    .status(404)
    .send(
      "<div style='text-align:center'><p>Not Found 404.</p>  <a href='/'>go back to mainPage. </a><div>"
    );
});

module.exports = router;
