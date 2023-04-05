const jsName = "/test";

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
//mysql 모듈
const moduleMysql = require("../modules/dbconnection/mysql/mysql");
//카운트 모듈
let moduleViewCount = require("../modules/count/viewCount");
//엑셀 모듈
let moduleXlsx = require("../modules/fileStore/xlsx");
//메일 모듈
let moduleMailing = require("../modules/mailing/google_mail");

const HttpError = require("../modules/http-error");
const { validationResult } = require("express-validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const User = require("../models/user");
//const mongoose = require("mongoose");
//const Contents = require("../models/contents");

const getTest = async (req, res) => {
  const functionName = "getTest";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);
  //res.redirect("/login/home.html");
  //res.send("result!!");

  res.render("board/boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
};

const postTest = async (req, res) => {
  const functionName = "PostTest";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);
  //res.redirect("/login/home.html");
  //res.send("result!!");

  res.render("board/boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
};

//
const home = async (req, res) => {
  const functionName = "home";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);
  //res.redirect("/client/views/home/home.html");
  //res.send(result);
  res.render("home/home", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
};

//멤버 리스트
const memberList = async (req, res) => {
  const functionName = "memberList";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let params;

  //console.log(req.query);
  /** 
    if (req.query == null) {
      params = "1=1";
    } else {
      params = req.query;
    }
      */
  params = "1=1";
  //params = { member_id: "admin" };=
  const members = await moduleMysql.query("memberList", params);

  let memlist = [];
  for (var i = 0; i < members.length; i++) {
    console.log(members[i].member_id);
    memlist.push(members[i].member_id);
  }

  res.render("board/userList", {
    members: memlist,
  });
  //res.send(members);
};

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
exports.getTest = getTest;
exports.postTest = postTest;
exports.home = home;
exports.memberList = memberList;
