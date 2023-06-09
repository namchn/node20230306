const express = require("express");
const router = express.Router();
const compression = require("compression"); //응답을 압축
const cors = require("cors"); //cross-origin 요청

const jsName = "/function";
const functionController = require("../controllers/function-controller");

//카운트 모듈
let moduleXlsx = require("../modules/fileStore/xlsx");

//router.use(cors()); //cors 사용
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

//기능 설정
router.get("/", functionController.getTest);

//엑셀내용 저장 기능
router.get("/xlsx", functionController.xlsxStored);

//파일을 서버로 저장 폼
router.get("/fileToServerForm", functionController.fileToServerForm);
//파일을 서버로 저장 기능
router.post(
  "/fileToServer",
  functionController.uploadFileSingle(),
  functionController.fileToServer
);

//엑셀에서 디비로 저장 폼
router.get("/xlsxToDbForm", functionController.xlsxToDbForm);
//엑셀에서 디비로 저장 기능
router.post(
  "/xlsxToDB",
  functionController.uploadSingle(),
  functionController.xlsxToDB
);

//엑셀 디비에서 다운로드 기능
router.get("/xlsxDownload", functionController.xlsxDownload);

//엑셀 디비에서 클라이언트가 파일로 다운로드 기능
router.get("/xlsxFileDownload", functionController.xlsxFileDownload);

//구글 메일
router.post("/mailing", functionController.mailing);

//scheduling1
router.get("/scheduling1", functionController.scheduling1);
//scheduling3
router.get("/scheduling3", functionController.scheduling3);

//mysql 테스트
router.get("/mysql", functionController.mysql);

//공공 api subway 가져오기
//router.get("/api/subway", functionController.apiSubway);

//공공 api subway 가져오기
router.get("/api/subway", functionController.apiSubwayStored);

//파일 읽기
router.get("/readfile", functionController.readfile);

// 디비에서 엑셀파일을 메일 스케쥴링으로 보내기
router.get("/exmail", functionController.exmail);

// 소캣통신
router.get("/socket", functionController.socket);

//모듈 주입
module.exports = router;
