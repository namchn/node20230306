const jsName = "/test";

// 시간 모먼트js
const moment = require("moment");
require("moment-timezone");
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
//현재시간
moment.tz.setDefault("Asia/Seoul");
let today = moment().format();

const HttpError = require("../modules/http-error");
const { validationResult } = require("express-validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const User = require("../models/user");
//const mongoose = require("mongoose");
//const Contents = require("../models/contents");

const getTest = async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  console.log(jsName + "/get");
  console.log("adress: " + "/get");
  //res.redirect("/login/home.html");
  res.send("result!!");
};

const home = async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  console.log(jsName + "/home");
  res.redirect("/login/home.html");
  //res.send(result);
};

const memberList = async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/memberList");
  let params;

  console.log(req.query);
  /** 
    if (req.query == null) {
      params = "1=1";
    } else {
      params = req.query;
    }
      */
  params = "1=1";
  //params = { member_id: "admin" };
  const members = await mysql.query("memberList", params);

  let memlist = [];
  for (var i = 0; i < members.length; i++) {
    console.log(members[i].member_id);
    memlist.push(members[i].member_id);
  }

  res.render("userList", {
    members: memlist,
  });
  //res.send(members);
};

exports.getTest = getTest;
exports.home = home;
exports.memberList = memberList;
