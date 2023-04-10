const express = require("express");
const router = express.Router();
const moduleAlertMove = require("../modules/util/alertMove");
const moduleLoginCheck = require("../modules/login/login-check");
//*cross-origin 요청: 다른 서버의 요청을 가능하게 함
const cors = require("cors"); //Cross-Origin Resource Sharing
const compression = require("compression"); //응답을 압축
const compressionOpt = {
  level: 6,
  threshold: 100 * 1000,
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      // header에 x-no-compression이 있으면, 압축하지 않도록 false를 반환한다.
      return false;
    }
    return compression.filter(req, res);
    // 없는 경우에는 압축허용
  },
};
/**
level : 압축 정도를 설정하는 것으로 -1에서 9까지 가능하다. 1이 기본 압축을 의미하며, -1은 압축을 하지 않는 것이며, nodejs 환경에서는 6으로 설정하는 것이 가장 최적화하는 수준이다.
threshold: 압축하지 않는 최소한의 크기를 설정하는 것이다. 예를 들어 threshold : 100 * 1000은 100kb아래의 데이터는 압축하지 않고, 클라이언트에게 전송한다.
filter: 특정 조건에 따라 압축을 할지 말지를 결정하는 것이다.
*/

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
router.use("/board", cors(), compression(compressionOpt), boardRoute); //board 라우트를 추가하고 기본경로로 /board 사용
router.use("/daily", cors(), Auth, dailyRoute); //daily 라우트를 추가하고 기본경로로 /daily 사용
router.use("/function", cors(), functionRoute); //function 라우트를 추가하고 기본경로로 /function 사용
router.use("/test", cors(), testRoute); //test 라우트를 추가하고 기본경로로 /test 사용

//에러처리
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ statusCode: res.statusCode, errMessage: err.message });
});

// *기본경로나 /사용 경로  가 아닌 잘못된 진입에 404 오류발생
router.use((req, res, next) => {
  /** 
  res
    .status(404)
    .send(
      "<div style='text-align:center'><p>Not Found 404.</p>  <a href='/'>go back to mainPage. </a><div>"
    );
  */
  res.status(404).render("errorPage/404");
});

/*
//no-cache 설정
router.use((req, res, next) => {
  //post 일때만 적용된다.
  res.header("Cache-Control", "private,no-cache,no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
});
*/

module.exports = router;
