const express = require("express");
const router = express.Router();
const compression = require("compression"); //응답을 압축
const cors = require("cors"); //cross-origin 요청

const jsName = "/test";
const testController = require("../controllers/test-controller");

const { check } = require("express-validator");
//const checkAuth = require("../middleware/check-auth");
//const fileUpload = require("../middleware/file-upload");

//router.use(cors()); //cors 사용
//const bodyParser = require("body-parser");
//router.use(bodyParser.urlencoded({ extended: true }));

/*
router.use(
  express.json({
    limit: "50mb", //  요청 body 크기 제한
  })
);
router.use(express.urlencoded({ extended: true }));
*/
const HttpError = require("../modules/http-error");

//에러를 넘길 수 있다.
router.use("/errs", (req, res, next) => {
  const error = new HttpError("에러다.", 500);
  //throw error;
  next(error);
  //next(new Error("에러다"));
  //res.send("gogogo");
});

router.get("/ejs", async (req, res) => {
  res.render("boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
});

//
const axios = require("axios");
require("dotenv").config();
router.get("/send", async (req, res) => {
  /* const response = await axios.get(
    `https://port-0-node2023-3j5jwm62alg3i5c0s.sel3.cloudtype.app/login/loginHome`
  ); */

  const response = await axios.get(`https://daum.net`);
  const data = response.data;

  //console.log(data);
  res.send(data);

  /*   res.render("home/home", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  }); */
});
//

/////////////////////////////////////////////////////////
const fs = require("fs"); //파일시스템
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");
require("dotenv").config({ path: "mysql/.env" });
const mysql = require("../mysql/index.js");
/////////////////////////////////////////////////////////

//멤버 가입폼 @
router.get("/", compression(), async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  console.log(jsName + "/");
  //res.redirect("/login/home.html");
  //res.send("result!");
  res.render("board/boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
});

router.post("/", async (req, res) => {
  //const customers = await mysql.query("sellerList");
  res.send("hi! 유성민 바보.");
});

//
//
//
//
//
//
//멤버 가입폼 @
router.get("/log", async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  const result = userList;
  console.log(jsName + "/log");
  // res.redirect("/login/home.html");
  res.send(result);
});

//멤버 가입폼 @
router.get("/home", async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  console.log(jsName + "/home");
  //res.redirect("/client/login/home.html");
  let homePath = path.join(__dirname + "/../client/login/home.html");
  //res.send("result");
  res.sendFile(homePath);
  //res.send(result);
});

//멤버 전체 검색 @
router.post("/member/memberList", async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/member/memberList");
  let params;
  //console.log(req.body);
  /** */
  if (req.body.param == null) {
    params = "1=1";
  } else {
    params = req.body.param;
  }
  const members = await mysql.query("memberList", params);
  res.send(members);
  //res.send("1!");
});

//멤버수 검색 @
router.post("/member/memberListCount", async (req, res) => {
  console.log(jsName + "/member/memberListCount");
  const mysql = require("../mysql/index.js");
  let params;
  if (req.body.param == null) {
    params = "1=1";
  } else {
    params = req.body.param;
  }
  const membersCount = await mysql.query("memberListCount", params);
  res.send(membersCount);
});

//멤버 검색 @
router.post("/member/memberListOne", async (req, res) => {
  console.log(jsName + "/member/memberListOne");
  const mysql = require("../mysql/index.js");
  let params;
  if (req.body.param == null) {
    params = "null";
  } else if (req.body.param.member_id != null) {
    //member_id 명시적으로 나타나지 않아야 함.
    params = req.body.param.member_id;
  } else {
    params = req.body.param;
  }
  const members = await mysql.query("memberListOne", params);
  //console.log(members);
  res.send(members);
});

//멤버 전체 검색@
router.get("/member/memberList", async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/member/memberList");
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
});

//멤버 로그인 페이지 @
router.get("/member/loginform", async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/member/loginform");
  res.redirect("/client/login/loginform.html");
});

//멤버 로그인 @
router.post("/member/memberLogin", async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/member/memberLogin");
  console.log(req.body);
  let redirectPage = "/client/login/loginform.html";

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
      redirectPage = "/client/login/home_login.html";
    }
    //res.send(members);
    res.redirect(redirectPage);
  }
});

//멤버 로그아웃 @
router.get("/member/memberLogout", async (req, res) => {
  console.log(jsName + "/member/memberLogout");
  console.log("로그아웃 완료");
  let redirectPage = "/client/login/home.html";
  res.redirect(redirectPage);
});

//멤버 가입폼@
router.get("/member/memberJoinForm", async (req, res) => {
  console.log(jsName + "/member/memberJoinForm");
  //const result = await mysql.query("memberInsert", req.body.param);
  res.redirect("/client/login/joinForm.html");
  //res.send(result);
});

//멤버 가입하기 @
router.post("/member/memberJoin", async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/member/memberJoin");
  //console.log(req.body);
  let redirectPage = "/client/login/joinForm.html";
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
        redirectPage = "/test/home";
        res.redirect(redirectPage);
        //res.send(result);
      } else {
        res.redirect(redirectPage);
      }
    }
  }
});
//멤버 가입 @
router.post("/member/memberInsert", async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/member/memberInsert");
  const result = await mysql.query("memberInsert", req.body.param);
  res.send(result);
});
//멤버 정보변경 @
router.post("/member/memberUpdateOne", async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/member/memberUpdateOne");
  const result = await mysql.query("memberUpdateOne", req.body.param);
  res.send(result);
});
//멤버 삭제 @
router.post("/member/memberDeleteOne", async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/member/memberUpdateOne");
  const result = await mysql.query("memberDeleteOne", req.body.param);
  res.send(result);
});
//멤버 복구
router.post("/member/memberRecoverOne", async (req, res) => {
  const mysql = require("../mysql/index.js");
  console.log(jsName + "/member/memberRecoverOne");
  const result = await mysql.query("memberRecoverOne", req.body.param);
  res.send(result);
});

/**
//아이디 클릭수 체크
router.post("/member/click", async (req, res) => {
  let member_id = req.body.member_id;
  let click_no = "1";

  if (member_id == "") {
    res.redirect("/home");
  } else {
    const result = await mysql.query("memberClickOne", member_id);

    console.log(result[0].click_no);

    if (result.length == 0) {
      let params = [member_id, click_no];
      const clickInsert = await mysql.query("memberClickInsert", params);
    } else {
      click_no = result[0].click_no + 1;
      let params = [click_no, member_id];
      const clickUpdate = await mysql.query("memberClickUpdate", params);
    }

    console.log(
      "아이디 " + member_id + "의 카운트 :" + (result[0].click_no + 1)
    );
    //res.redirect("/home");

    fs.readFile("./login/home.html", "utf8", function (err, buf) {
      res.send(buf);
    });

    //res.send("아이디 " + member_id + "의 카운트 :" + (result[0].click_no + 1));
  }
});
 */

//아이디 클릭수 체크
router.post("/member/click", async (req, res) => {
  let member_id = req.body.member_id;
  let click_no = "1";

  if (member_id == "") {
    res.redirect("/home");
  } else {
    const result = await mysql.query("memberClickOne", member_id);

    let clickNo = 1;
    if (result.length == 0) {
      let params = [member_id, click_no];
      const clickInsert = await mysql.query("memberClickInsert", params);
    } else {
      console.log(result[0].click_no);
      click_no = result[0].click_no + 1;
      let params = [click_no, member_id];
      const clickUpdate = await mysql.query("memberClickUpdate", params);

      clickNo = result[0].click_no + 1;
      console.log("아이디 " + member_id + "의 카운트 :" + clickNo);
    }

    //res.redirect("/home");

    /** 
    fs.readFile("./login/home.html", "utf8", function (err, buf) {
      res.send(buf);
    });
    */

    //res.send("아이디 " + member_id + "의 카운트 :" + (result[0].click_no + 1));

    res.render("home", {
      member_id: member_id,
      click_no: clickNo,
      length: 5,
    });
    //res.redirect("/home");
  }
});

//멤버 전체 검색@
router.get("/member/memberList", async (req, res) => {
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
});

router.get("/a", async (req, res) => {
  //
  res.sendFile(__dirname + "/login/home.html");
});

router.get("/b", async (req, res) => {
  //
  res.sendFile(__dirname + "/login/write.html");
});

/////////////////////아래는 예시 ////////////////////////////////

//로그인 정보 조회를 위한 라우트
//app.js에서 기본 경로에 /customer를 사용하기 때문에 /customer 라우트 경로를 가짐
router.get("/", function (req, res) {
  res.send("customer 라우트 루트");
});

//로그인 정보 추가 위한 라우트
//app.js에서 기본 경로에 /customer를 사용하기 때문에 /customer/insert 라우트 경로를 가짐
router.post("/insert", function (req, res) {
  res.send("customer/insert 라우트 루트");
});

//로그인 정보 수정 위한 라우트
//app.js에서 기본 경로에 /customer를 사용하기 때문에 /customer/update 라우트 경로를 가짐
router.put("/update", function (req, res) {
  res.send("customer/update 라우트 루트");
});

//로그인 정보 삭제 위한 라우트
//app.js에서 기본 경로에 /customer를 사용하기 때문에 /customer/delete 라우트 경로를 가짐
router.delete("/delete", function (req, res) {
  res.send("customer/delete 라우트 루트");
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//멤버 가입폼 @
router.get("/get", testController.getTest);
//멤버 가입폼 @
router.get("/post", testController.postTest);
//멤버 가입폼 @
router.get("/home", testController.home);
//멤버 전체 검색@
router.get("/memberList", testController.memberList);
//비동기 요청 코드1
router.get("/re1", testController.asyncHttpRequest1);
//비동기 요청 코드2
router.get("/re2", testController.asyncHttpRequest2);
//소켓통신채팅
router.get("/w", testController.socket);

//모듈 주입
module.exports = router;
