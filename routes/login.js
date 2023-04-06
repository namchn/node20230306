const express = require("express");
const router = express.Router();
const cors = require("cors"); //cross-origin 요청

const jsName = "/login";
const loginController = require("../controllers/login-controller");

//router.use(cors()); //cors 사용
router.use(
  express.json({
    limit: "50mb", //
  })
);
//const bodyParser = require("body-parser");
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: true }));

//멤버 홈
router.get("/loginHome", loginController.loginHome);
//멤버 가입 페이지
router.get("/memberJoinForm", loginController.joinForm);
//멤버 가입하기 로직
router.post("/memberJoin", loginController.memberJoin);
//멤버 로그인 페이지
router.get("/loginForm", loginController.loginForm);
//멤버 로그인 로직
router.post("/memberLogin", loginController.memberLogin);
//멤버 로그인 확인
router.get("/loginConfirm", loginController.loginConfirm);
//멤버 로그아웃
router.get("/loginOut", loginController.loginOut);

//모듈 주입
module.exports = router;
