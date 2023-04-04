const jsName = "/function";

//경로 모듈
const path = require("path");
// 시간 모먼트js
const moment = require("moment");
require("moment-timezone");
//현재시간
moment.tz.setDefault("Asia/Seoul");

//로그인 체크 모듈
const loginCheckModule = require("../modules/login/login-check");
//session 전역변수 선언
const session = require("../modules/session/session");
//유효값 체크 모듈
const validCheckModule = require("../modules/valid/valid");
//암호화 모듈
const moduleSaltCrypto = require("../modules/crypto/module_saltCrypto");
//카운트 모듈
let moduleViewCount = require("../modules/count/viewCount");

//카운트 모듈
let moduleXlsx = require("../modules/fileStore/xlsx");

const HttpError = require("../modules/http-error");
const { validationResult } = require("express-validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const User = require("../models/user");
//const mongoose = require("mongoose");
//const Contents = require("../models/contents");

const getTest = async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  const functionName = "getTest";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);
  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  let falseRedirectURL = "/board/write"; //잘못되었을경우 리다이렉트 주소
  let renderURL = "home/home2"; //랜딩 주소
  let params = { title: "테스트 중입니다..", length: 5 };
  //res.redirect("/login/home.html");
  //res.send("result!!");

  res.render("board/boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
};

const t1 = async (param) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  const functionName = "t1";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log("param : " + param);
  console.log(relativeUrl);
  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  let falseRedirectURL = "/board/write"; //잘못되었을경우 리다이렉트 주소
  let renderURL = "home/home2"; //랜딩 주소
  let params = { title: "테스트 중입니다..", length: 5 };
  //res.redirect("/login/home.html");
  //res.send("result!!");

  //res.send("t1 test");
  /**
  res.render("board/boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
   */
};

//엑셀 기능
const xlsxStored = async (req, res) => {
  //엑셀 파일 저장 기능
  const fileDirectory = "../uploads";
  const xlsxFileName = "customers.xlsx";
  const firstSheetName = "Customers";
  const storeDirectory = "./client/xlsx";

  const xlsxData = [
    { A: "고객명", B: "이메일", C: "연락처" },
    { A: "유재석", B: "ryu@gmail.com", C: "010-0000-1111" },
    { A: "김종국", B: "kim@gmail.com", C: "010-0000-2222" },
    { A: "지석진", B: "ji@gmail.com", C: "010-0000-3333" },
    { A: "하하", B: "ha@gmail.com", C: "010-0000-4444" },
  ];

  const xlsxHeader = ["A", "B", "C"];
  const colsWidth = [50, 120, 120];
  const skipHeader = true;
  //skipHeader가 false이면 엑셀 시트의 첫 번쨰 행에 header에 해당하는 A,B,C 가 삽입됨.

  moduleXlsx.xlsxStored(
    fileDirectory,
    xlsxFileName,
    firstSheetName,
    storeDirectory,
    xlsxData,
    xlsxHeader,
    skipHeader,
    colsWidth
  );

  res.send("ok!");
};

const xlsxToDbForm = async (req, res, next) => {
  res.render("xlsx/xlsx_upload", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
};

//엑셀 업로드 설정 기능
const uploadSingle = () => {
  //
  const uploadDirectory = path.join(__dirname, "/../uploads");
  return moduleXlsx.uploadSingle(uploadDirectory);
};

//엑셀에서 디비로 저장 기능
const xlsxToDB = async (req, res, next) => {
  //
  const uploadDirectory = path.join(__dirname, "/../uploads");
  const DbUsePath = path.join(__dirname, "/../mysql/index.js");
  queryId = "customerInsert";
  const result = await moduleXlsx.xlsxToDB(
    req,
    res,
    uploadDirectory,
    DbUsePath,
    queryId
  );
  console.log(result);
  let falseRedirectURL = "/function/xlsxToDbForm";
  let errMsg = "디비 업로드 되었습니다.";

  if (result) {
    res.send(`
    <script>
      alert('${errMsg}')
      location.href = '${falseRedirectURL}'
    </script>`);
  } else {
    res.redirect(falseRedirectURL);
  }

  //res.send("ok");
};

//엑셀 다운로드
const xlsxDownload = async (req, res, next) => {
  //

  const uploadDirectory = path.join(__dirname, "/../uploads");
  const DbUsePath = path.join(__dirname, "/../mysql/index.js");
  const queryId = "customerList";
  const header = ["id", "name", "email", "phone", "address"];
  const colsWidth = [
    { wpx: 50 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
  ];
  const firstSheetName = "Customers";
  const downloadDiretory = "./xlsx";
  const xlsxFileName = "customersFromDB3.xlsx";

  const result = await moduleXlsx.xlsxDownload(
    req,
    res,
    DbUsePath,
    queryId,
    header,
    colsWidth,
    firstSheetName,
    xlsxFileName,
    downloadDiretory
  );

  let falseRedirectURL = "/login/loginHome";
  let errMsg = "디비에서 엑셀 다운로드 되었습니다.";

  if (result) {
    res.send(`
    <script>
      alert('${errMsg}')
      location.href = '${falseRedirectURL}'
    </script>`);
  } else {
    res.redirect(falseRedirectURL);
  }

  //res.redirect("/");
  //res.send("downloadDBtoExcel!");
};

//엑셀파일 다운로드
const xlsxFileDownload = async (req, res, next) => {
  //
  // const uploadDirectory = path.join(__dirname, "/../uploads");
  const DbUsePath = path.join(__dirname, "/../mysql/index.js");
  const queryId = "customerList";
  const header = ["id", "name", "email", "phone", "address"];
  const colsWidth = [
    { wpx: 50 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
  ];
  const firstSheetName = "Customers";
  //const downloadDiretory = "./xlsx";
  const xlsxFileName = "customersFromDB.xlsx";

  const result = await moduleXlsx.xlsxFileDownload(
    req,
    res,
    DbUsePath,
    queryId,
    header,
    colsWidth,
    firstSheetName
  );

  res.setHeader("Content-disposition", "attachment; filename=" + xlsxFileName); //다운로드 파일명 설정
  res.setHeader(
    "Content-type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ); //엑셀 파일 minetype 설정
  res.end(Buffer.from(result, "base64"));
  //res.redirect("/")
};

exports.getTest = getTest;
exports.t1 = t1;
exports.xlsxStored = xlsxStored;

exports.xlsxToDbForm = xlsxToDbForm;
exports.uploadSingle = uploadSingle;
exports.xlsxToDB = xlsxToDB;
exports.xlsxDownload = xlsxDownload;
exports.xlsxFileDownload = xlsxFileDownload;
//exports.scheduling = scheduling
