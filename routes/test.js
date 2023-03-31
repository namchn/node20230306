const express = require("express");
const router = express.Router();
const cors = require("cors"); //cross-origin 요청

const { check } = require("express-validator");

const testController = require("../controllers/test-controller");

//const checkAuth = require("../middleware/check-auth");
//const fileUpload = require("../middleware/file-upload");

router.use(cors()); //cors 사용
//const bodyParser = require("body-parser");
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  express.json({
    limit: "50mb", //  요청 body 크기 제한
  })
);

const HttpError = require("../modules/http-error");
// https://velog.io/@yunsungyang-omc/Node.js-express%EC%97%90%EC%84%9C-%EC%97%90%EB%9F%AC%EB%A1%9C-HTTP-status-code-%ED%86%B5%EC%A0%9C%ED%95%98%EA%B8%B0

/*  
router.use((req, res, next) => {
  const error = new HttpError("경로를 찾을 수 없습니다.", 404);
  throw error;
  //next(error);
});
*/

router.use(express.urlencoded({ extended: true }));
const jsName = "/test";

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
  res.send("result");
});

//멤버 가입폼 @
router.get("/get", testController.getTest);

//멤버 가입폼 @
router.get("/home", testController.home);

//멤버 전체 검색@
router.get("/memberList", testController.memberList);

//모듈 주입
module.exports = router;
