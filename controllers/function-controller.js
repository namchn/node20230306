const jsName = "/fuction";

// 시간 모먼트js
const moment = require("moment");
//로그인 체크 모듈
const loginCheckModule = require("../modules/login/login-check");
//session 전역변수 선언
const session = require("../modules/session/session");
//유효값 체크 모듈
const validCheckModule = require("../modules/valid/valid");

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
  //res.send("result!!");

  res.render("board/boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
};

exports.getTest = getTest;
