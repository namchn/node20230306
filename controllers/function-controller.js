const jsName = "/function";

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

exports.getTest = getTest;
exports.t1 = t1;
