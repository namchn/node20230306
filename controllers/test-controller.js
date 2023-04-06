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
const moduleViewCount = require("../modules/count/viewCount");
//엑셀 모듈
const moduleXlsx = require("../modules/fileStore/xlsx");
//메일 모듈
const moduleMailing = require("../modules/mailing/google_mail");
//스케쥴 모듈
const modulescheduling = require("../modules/scheduling/scheduling");
//파일 모듈
const moduleFs = require("../modules/fs/fs");
//test 모듈
const testFs = require("../modules/test/test");

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

//비동기 요청 코드1
const https = require("https");
const asyncHttpRequest1 = async (req, res) => {
  let htmlPath;
  //포문을 돌려요
  let before = moment().valueOf();
  var i = 0;
  for (i = 0; i < 1; i++) {
    let num = Number(5652592600 + i);
    let numStr = "" + num;
    // HTTP 요청을 보낼 옵션 설정
    const options = {
      //hostname: "search.daum.net", //
      hostname: "port-0-node2023-3j5jwm62alg3i5c0s.sel3.cloudtype.app", //example.com

      //hostname: "www.fmkorea.com",
      //path: "/" + numStr, //  /some/path
      path: "/login/loginHome", //  /some/path
      //path: "/", //  /some/path
      method: "GET",
    };
    htmlPath = await testFs.t1(options, "_" + numStr);
  }
  let after = moment().valueOf();
  console.log("시간차이 (밀리세컨드):");
  console.log(after - before);
  //
  //console.log(htmlPath);

  // 2초 간격으로 메시지를 보여줌
  let timerId = setInterval(() => console.log("째깍"), 5000);

  // 5초 후에 정지
  setTimeout(() => {
    clearInterval(timerId);
    console.log("정지");
  }, 10001);

  setTimeout(function () {
    res.send("htmlPath");
    //res.sendFile(htmlPath);
  }, after - before + 500);
};

//비동기 요청 코드2
const asyncHttpRequest2 = async (req, res) => {
  let htmlPath;
  //포문을 돌려요
  let before = moment().valueOf();
  let after = moment().valueOf();
  console.log("시간차이 (밀리세컨드):");
  console.log(after - before);
  //
  //console.log(htmlPath);

  //htmlPath = htmlPath.replace(".html", i - 1 + ".html");

  const printNumbers = async (from, to) => {
    let current = from;

    let timerId = setInterval(async () => {
      var i = current;
      let num = Number(5652592600 + i);
      console.log(num);
      //let numStr = "" + num;
      // HTTP 요청을 보낼 옵션 설정
      const options = {
        //hostname: "search.daum.net", //
        hostname: "port-0-node2023-3j5jwm62alg3i5c0s.sel3.cloudtype.app", //example.com

        //hostname: "www.fmkorea.com",
        //path: "/" + "" + num, //  /some/path
        path: "/login/loginHome", //  /some/path
        //path: "/", //  /some/path
        method: "GET",
      };
      htmlPath = await testFs.t1(options, "_" + num);
      //
      if (current == to) {
        clearInterval(timerId);
        console.log("정지");
      }
      current++;
    }, 1000);
  };

  // usage:
  printNumbers(0, 100);

  setTimeout(function () {
    res.send("htmlPath");
    //res.sendFile(htmlPath);
  }, after - before + 500);
};
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
exports.getTest = getTest;
exports.postTest = postTest;
exports.home = home;
exports.memberList = memberList;
exports.asyncHttpRequest1 = asyncHttpRequest1;
exports.asyncHttpRequest2 = asyncHttpRequest2;
