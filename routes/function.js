const express = require("express");
const router = express.Router();
const cors = require("cors"); //cross-origin 요청

const jsName = "/function";
const functionController = require("../controllers/function-controller");

router.use(cors()); //cors 사용
router.use(
  express.json({
    limit: "50mb", //  요청 body 크기 제한
  })
);
//const bodyParser = require("body-parser");
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: true }));

//router.use(cors()); //cors 사용
//const bodyParser = require("body-parser");
//router.use(bodyParser.urlencoded({ extended: true }));

const { check } = require("express-validator");

//로그인 데이터를 가져오는 용도 test
const { userList } = require("../model/user.js");

//const checkAuth = require("../middleware/check-auth");
//const fileUpload = require("../middleware/file-upload");

// https://velog.io/@yunsungyang-omc/Node.js-express%EC%97%90%EC%84%9C-%EC%97%90%EB%9F%AC%EB%A1%9C-HTTP-status-code-%ED%86%B5%EC%A0%9C%ED%95%98%EA%B8%B0
const HttpError = require("../modules/http-error");
/*  
router.use((req, res, next) => {
  const error = new HttpError("경로를 찾을 수 없습니다.", 404);
  throw error;
  //next(error);
});
*/

// 에러 처리
router.use((error, req, res, next) => {
  // if (req.file) {
  //   fs.unlink(req.file.path, (err) => {
  //     console.log(err);
  //   });
  // }
  console.log(req);
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//멤버 가입폼 @
router.get("/", async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  console.log(jsName + "/");
  //res.redirect("/login/home.html");
  //res.send("result!");
  res.render("board/boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
});

//기능 설정
router.get("/get", functionController.getTest);

//모듈 주입
module.exports = router;
