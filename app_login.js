const express = require("express");
const app = express();

//설정값 가져오기
const { setPort } = require("./modules/setting/setting");
const port = setPort["value"];

//cross-origin 요청: 다른 서버의 요청을 가능하게 함
// https://velog.io/@cptkuk91/Node.js-CORS-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
const cors = require("cors");
//app.use(cors());

//라우트별 사용
var corsOptions = {
  origin: "*", //http://example.com
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//app.get("/cors", cors(corsOptions), function (req, res) {
app.get("/cors", cors(corsOptions), function (req, res) {
  res.json({ msg: "This is CORS-enabled for a Single Route" });
});

/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
*/

// 요청 body 파싱
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cookie-parser사용
//const cookieParser = require("cookie-parser");
//app.use(cookieParser());

//정적파일 접근
// app.use("/uploads/images", express.static(path.join("uploads", "images")));

//*router
const customerRoute = require("./routes/customer"); //cutomer라우트 추가
const productRoute = require("./routes/product"); //product라우트 추가
const loginRoute = require("./routes/login"); //product라우트 추가
const testRoute = require("./routes/test"); //test라우트 추가

const boardRoute = require("./routes/board"); //test라우트 추가

//const productRoute = require("./routes/koreans");
//productRoute();
app.use("/customer", customerRoute); //customer 라우트를 추가하고 기본경로로 /customer 사용
app.use("/product", productRoute); //product 라우트를 추가하고 기본경로로 /product 사용
app.use("/login", loginRoute); //login 라우트를 추가하고 기본경로로 /login 사용
app.use("/test", testRoute); //test 라우트를 추가하고 기본경로로 /test 사용

app.use("/board", boardRoute); //test 라우트를 추가하고 기본경로로 /test 사용

//
//
//
const fs = require("fs"); //파일시스템

const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");
require("dotenv").config({ path: "mysql/.env" });
const mysql = require("./mysql/index.js");

//정적파일 경로 설정
app.use("/xlsx", express.static("xlsx"));
app.use("/login", express.static("login"));
app.use("/client", express.static("client"));

app.use(
  express.json({
    limit: "50mb", //
  })
);

app.listen(port, () => {
  console.log("Server started. port " + port);
});

const HttpError = require("./modules/http-error");
// https://velog.io/@yunsungyang-omc/Node.js-express%EC%97%90%EC%84%9C-%EC%97%90%EB%9F%AC%EB%A1%9C-HTTP-status-code-%ED%86%B5%EC%A0%9C%ED%95%98%EA%B8%B0

/* 
app.use((req, res, next) => {
  const error = new HttpError("경로를 찾을 수 없습니다.", 404);
  throw error;
  //next(error);
});
*/
app.get("/er", (req, res) => {
  //const error = new HttpError("경로를 찾을 수 없습니다.", 404);
  //throw error;

  //const e = new Error("sample");
  //e.status = 400;
  //throw e;
  res.send("error 테스트");
});

app.get("/", (req, res) => {
  res.redirect("/login/loginHome");
  //res.send("들어온걸 환영한다 용사여");
});

app.post("/", async (req, res) => {
  //const customers = await mysql.query("sellerList");
  res.send("hi! 유성민 바보.");
});

//////////////////////이하는 routes/login.js에 기입///////////////////////

//멤버 가입폼 @
app.get("/home", async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  res.redirect("/login/home.html");
  //res.send(result);
});
//멤버 전체 검색 @
app.post("/member/memberList", async (req, res) => {
  let params;
  console.log(req.body);
  if (req.body.param == null) {
    params = "1=1";
  } else {
    params = req.body.param;
  }
  const members = await mysql.query("memberList", params);
  res.send(members);
});

//멤버수 검색 @
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

//멤버 검색 @
app.post("/member/memberListOne", async (req, res) => {
  const members = await mysql.query("memberListOne", req.body.param);
  //console.log(members);
  res.send(members);
});

//멤버 로그인 페이지 @
app.get("/member/loginform", async (req, res) => {
  res.redirect("/login/loginform.html");
});

//멤버 로그인 @
app.post("/member/memberLogin", async (req, res) => {
  console.log(req.body);
  let redirectPage = "/login/loginform.html";

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
      redirectPage = "/login/home_login.html";
    }
    //res.send(members);
    res.redirect(redirectPage);
  }
});

//멤버 로그아웃 @
app.get("/member/memberLogout", async (req, res) => {
  console.log("로그아웃 완료");
  let redirectPage = "/login/home.html";
  res.redirect(redirectPage);
});

//멤버 가입폼 @
app.get("/member/memberJoinForm", async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  res.redirect("/login/joinForm.html");
  //res.send(result);
});

//멤버 가입하기 @
app.post("/member/memberJoin", async (req, res) => {
  //console.log(req.body);
  let redirectPage = "/login/joinForm.html";
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

//멤버 가입 @
app.post("/member/memberInsert", async (req, res) => {
  const result = await mysql.query("memberInsert", req.body.param);
  res.send(result);
});

//멤버 정보변경 @
app.post("/member/memberUpdateOne", async (req, res) => {
  const result = await mysql.query("memberUpdateOne", req.body.param);
  res.send(result);
});

//멤버 삭제 @
app.post("/member/memberDeleteOne", async (req, res) => {
  const result = await mysql.query("memberDeleteOne", req.body.param);
  res.send(result);
});

//멤버 복구 @
app.post("/member/memberRecoverOne", async (req, res) => {
  const result = await mysql.query("memberRecoverOne", req.body.param);
  res.send(result);
});

/**
//아이디 클릭수 체크
app.post("/member/click", async (req, res) => {
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

//뷰pug 템플릿
//app.set("view engine", "pug");
//app.set("views", "views");
//const home = (req, res) => res.render("main");
//app.get("/main", home);

//app.engine("html", require("ejs").renderFile);
//app.set("view engine", "html");

//템플릿 설정
const ejs = require("ejs");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
//app.set("view engine", "ejs");
app.set("views", "./client/views");

app.get("/ejs", async (req, res) => {
  res.render("boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
});

//아이디 클릭수 체크
app.post("/member/click", async (req, res) => {
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
app.get("/member/memberList", async (req, res) => {
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

app.get("/a", async (req, res) => {
  //
  res.sendFile(__dirname + "/login/home.html");
});

app.get("/b", async (req, res) => {
  //
  res.sendFile(__dirname + "/login/write.html");
});

/////////////////// 공공 아이피 활용 ///////////////
const request = require("request");
const { resolve } = require("path");
app.get("/c", async (req, res) => {
  //개발자 코드
  const Encode =
    "wfphOlaaSHfPq4wIst51%2BDyGAmkWwW9%2Bng8eYEDpc47eMhQrNOoyKbzD29SvqTlTEJlAq7ZZ5Q72INkBFX6uaA%3D%3D";
  //한 페이지 결과 수 //페이지 번호 //출발역 코드 //도착역 코드//주중.토.일//
  const options = {
    uri:
      "http://apis.data.go.kr/B553766/smt-path/path?serviceKey=" +
      Encode +
      "&numOfRows=10&pageNo=1&dept_station_code=0222&dest_station_code=4117&week=DAY",
    method: "GET",
    body: {
      priority: "high",
    },
    json: true,
  };
  //

  const result = async () => {
    return new Promise((resolve) => {
      request.get(options, function (err, resquest, body) {
        //callback
        if (err) {
          return console.log(err);
        }
        //console.log(body.data);
        resolve(body.data);
        //return body.data;
      });
    });
  };

  const api = await result();
  const apiRoute = api.route;
  //console.log(apiRoute);
  let trlist = [];
  for (var i = 0; i < apiRoute.length; i++) {
    //console.log(apiRoute[i].station_nm);
    trlist.push(apiRoute[i].station_nm);
  }

  /** 
  res.render("trainList", {
    trlist: apiRoute,
  });
   */

  res.send(api);
});
