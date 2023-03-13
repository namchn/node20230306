const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");
require("dotenv").config({ path: "mysql/.env" });
const mysql = require("./mysql/index.js");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("xlsx"));
app.use(express.static("login"));

app.use(
  express.json({
    limit: "50mb", //
  })
);

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

app.get("/", (req, res) => {
  res.send("들어온걸 환영한다 용사여");
});

app.post("/", async (req, res) => {
  //const customers = await mysql.query("sellerList");
  res.send("hi! 유성민 바보.");
});

//멤버 가입폼
app.get("/home", async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  res.redirect("/home.html");
  //res.send(result);
});

//멤버 전체 검색
app.post("/member/memberList", async (req, res) => {
  let params;
  if (req.body.param == null) {
    params = "1=1";
  } else {
    params = req.body.param;
  }
  const members = await mysql.query("memberList", params);
  res.send(members);
});

//멤버수 검색
app.post("/member/memberListCount", async (req, res) => {
  let params;
  if (req.body.param == null) {
    params = "1=1";
  } else {
    params = req.body.param;
  }
  const membersCount = await mysql.query("memberListCount", params);
  res.send(membersCount);
});

//멤버 검색
app.post("/member/memberListOne", async (req, res) => {
  const members = await mysql.query("memberListOne", req.body.param);
  //console.log(members);
  res.send(members);
});

//멤버 로그인 페이지
app.get("/member/loginform", async (req, res) => {
  res.redirect("/loginform.html");
});

//멤버 로그인
app.post("/member/memberLogin", async (req, res) => {
  console.log(req.body);
  let redirectPage = "/loginform.html";

  let member_id = req.body.member_id;
  let member_pw = req.body.member_pw;
  if (member_id == "" || member_pw.length == "") {
    res.redirect(redirectPage);
  } else {
    let params = [member_id, member_pw];
    const members = await mysql.query("memberListOneCheck", params);
    //console.log(members);
    if (members.length > 0) {
      console.log(members.length);
      console.log("로그인 완료");
      redirectPage = "/home_login.html";
    }
    //res.send(members);
    res.redirect(redirectPage);
  }
});

//멤버 로그아웃
app.get("/member/memberLogout", async (req, res) => {
  console.log("로그아웃 완료");
  let redirectPage = "/home.html";
  res.redirect(redirectPage);
});

//멤버 가입폼
app.get("/member/memberJoinForm", async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  res.redirect("/joinForm.html");
  //res.send(result);
});

//멤버 가입하기
app.post("/member/memberJoin", async (req, res) => {
  //console.log(req.body);
  let redirectPage = "/joinForm.html";
  let member_id = req.body.member_id;
  let member_nm = req.body.member_nm;
  let member_pw = req.body.member_pw;
  let member_pw2 = req.body.member_pw2;
  let member_pw_salt = req.body.member_pw;
  if (
    member_id == "" ||
    member_nm == "" ||
    member_pw == "" ||
    member_pw != member_pw2
  ) {
    res.redirect(redirectPage);
  } else {
    let params = [member_id, member_nm, member_pw, member_pw_salt];
    // -->아이디 중복 체크부분

    const checked = await mysql.query("memberListOne", member_id);

    if (checked.length > 0) {
      console.log(checked.length + " : 아이디 중복");
      res.redirect(redirectPage);
    } else {
      const result = await mysql.query("memberInsertOne", params);
      if (result) {
        console.log(result);
        redirectPage = "/home";
        res.redirect(redirectPage);
        //res.send(result);
      } else {
        res.redirect(redirectPage);
      }
    }
  }
});

//멤버 가입
app.post("/member/memberInsert", async (req, res) => {
  const result = await mysql.query("memberInsert", req.body.param);
  res.send(result);
});

//멤버 정보변경
app.post("/member/memberUpdateOne", async (req, res) => {
  const result = await mysql.query("memberUpdateOne", req.body.param);
  res.send(result);
});

//멤버 삭제
app.post("/member/memberDeleteOne", async (req, res) => {
  const result = await mysql.query("memberDeleteOne", req.body.param);
  res.send(result);
});

//멤버 복구
app.post("/member/memberRecoverOne", async (req, res) => {
  const result = await mysql.query("memberRecoverOne", req.body.param);
  res.send(result);
});
