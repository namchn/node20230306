const jsName = "/login";

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
//메일 모듈
let moduleMailing = require("../modules/mailing/google_mail");

const HttpError = require("../modules/http-error");
const { validationResult } = require("express-validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const User = require("../models/user");
//const mongoose = require("mongoose");
//const Contents = require("../models/contents");

const loginHome = async (req, res) => {
  const functionName = "loginHome";
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

  //url 뷰 카운트
  if (isValid) {
    let re = moduleViewCount.urlViewCount(relativeUrl);
  }

  //const result = await mysql.query("memberInsert", req.body.param);

  //res.redirect("/client/views/home/home.html");
  //res.send(result);

  if (isValid) {
    //로그인 체크
    loginResult = await loginCheckModule.loginCheck(
      req.headers.cookie,
      session,
      req.session.user
    );
    isValid = loginResult.isLogin ? true : false;
  }

  if (isValid) {
    //사용자 확인
    console.log(today + "======");
    console.log(loginResult.userInfo);
  }

  //로그인 되었을 경우
  Object.assign(params, loginResult);
  if (isValid) {
    res.render(renderURL, params);
  } else {
    res.render(renderURL, params);
  }

  //res.render("login/signForm", params);

  //console.log(jsName + "/member/memberJoinForm");
  //const result = await mysql.query("memberInsert", req.body.param);
  //res.redirect("/login/joinForm.html");
  //res.send(result);
};

//멤버 가입 폼
const joinForm = async (req, res) => {
  const functionName = "joinForm";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  let articleList; //디비 결과
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  //let falseRedirectURL = "/board/write"; //잘못되었을경우 리다이렉트 주소
  let renderURL = "login/signForm"; //랜딩 주소
  let params = { title: "테스트 중입니다..", length: 5 };
  //const result = await mysql.query("memberInsert", req.body.param);

  //url 뷰 카운트
  if (isValid) {
    let re = moduleViewCount.urlViewCount(relativeUrl);
  }
  //res.redirect("/client/views/home/home.html");
  //res.send(result);

  if (isValid) {
    //로그인 체크
    loginResult = await loginCheckModule.loginCheck(
      req.headers.cookie,
      session,
      req.session.user
    );
    isValid = loginResult.isLogin ? true : false;
  }
  if (isValid) {
    //사용자 확인
    console.log(today + "======");
    console.log(loginResult.userInfo);
  }

  //로그인 되었을 경우
  Object.assign(params, loginResult);
  if (isValid) {
    res.redirect(redirectURL);
    //res.render("home/home", params);
  } else {
    res.render(renderURL, params);
  }

  //res.render("login/signForm", params);

  //console.log(jsName + "/member/memberJoinForm");
  //const result = await mysql.query("memberInsert", req.body.param);
  //res.redirect("/login/joinForm.html");
  //res.send(result);
};

//멤버 가입하기 로직
const memberJoin = async (req, res) => {
  const functionName = "memberJoin";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  const mysql = require("../mysql/index.js");

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  //let articleList; //디비 결과
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  let falseRedirectURL = "/login/memberJoinForm"; //잘못되었을경우 리다이렉트 주소
  //let renderURL = "board/articleList2"; //랜딩 주소
  let boardNo;
  let params;
  let errMsg;

  //url 뷰 카운트
  if (isValid) {
    let re = moduleViewCount.urlViewCount(relativeUrl);
  }
  /**
  if (isValid) {
    //로그인 체크
    loginResult = await loginCheckModule.loginCheck(
      req.headers.cookie,
      session,
      req.session.user
    );
    isValid = loginResult.isLogin ? true : false;
  }
  if (isValid) {
    //사용자 확인
    console.log(loginResult.userInfo);
  }
   */

  let member_id = req.body.member_id;
  if (isValid) {
    isValid = req.body.member_id == undefined ? false : true;
    if (!isValid) {
      errMsg = "아이디 값이 없음";
    }
  }

  let member_nm = req.body.member_nm;
  if (isValid) {
    isValid = req.body.member_nm == undefined ? false : true;
    if (!isValid) {
      errMsg = "이름이 없음";
    }
  }

  let member_pw = req.body.member_pw;
  if (isValid) {
    isValid = req.body.member_pw == undefined ? false : true;
    if (!isValid) {
      errMsg = "패스워드가 없음";
    }
  }

  let member_pw2 = req.body.member_pw2;
  if (isValid) {
    isValid = req.body.member_pw2 == undefined ? false : true;
    if (!isValid) {
      errMsg = "패스워드가 없음";
    }
  }

  /**
  let member_pw_salt = req.body.member_pw_salt;
  if (isValid) {
    isValid = req.body.member_pw_salt == undefined ? false : true;
  }
   */

  if (isValid && member_pw != member_pw2) {
    isValid = false;
    console.log(today + "======");
    console.log(" 비밀번호가 다르다");
    errMsg = "위아래의 비밀번호가 다릅니다.";
  }

  //암호화
  let createdCryptoPieces = await moduleSaltCrypto.createCryptoPassword(
    member_pw
  );
  console.log(today + "======");
  console.log("암호화");
  console.log(createdCryptoPieces.password);
  console.log(createdCryptoPieces.salt);

  if (isValid) {
    params = [
      member_id,
      member_nm,
      createdCryptoPieces.password,
      createdCryptoPieces.salt,
    ];
    //아이디 중복 체크부분
    const checked = await mysql.query("memberListOne", member_id);
    console.log(today + "======");
    console.log(checked.length + " : 아이디 중복");
    isValid = checked.length > 0 ? false : true;

    if (!isValid) {
      errMsg = "중복된 아이디입니다. ";
    }
  }

  if (isValid) {
    const result = await mysql.query("memberInsertOne", params);
    console.log(today + "======");
    console.log(result.affectedRows);
    isValid = result.affectedRows != 1 ? false : true;
    if (!isValid) {
      errMsg = "회원가입에 실패하였습니다 다시 시도하여 주십시오. ";
    }
  }

  //console.log(" 비밀번호가 다르다 : " + isValid);

  if (isValid) {
    errMsg = "축하합니다. 가입되었습니다!";
    res.send(`
      <script>
        alert('${errMsg}')
        location.href = '${redirectURL}'
      </script>`);
    //res.redirect(redirectURL);
  } else {
    //가입 실패시 로직
    if (errMsg) {
      res.send(`
      <script>
        alert('${errMsg}')
        location.href = '${falseRedirectURL}'
      </script>`);
    } else {
      res.redirect(falseRedirectURL);
    }
  }
};

//멤버 로그인 확인
const loginConfirm = async (req, res) => {
  const functionName = "loginConfirm";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  //로그인 확인
  let params = { title: "테스트 중입니다..", length: 5 };

  //url 뷰 카운트
  if (isValid) {
    let re = moduleViewCount.urlViewCount(relativeUrl);
  }

  if (isValid) {
    //로그인 체크
    loginResult = await loginCheckModule.loginCheck(
      req.headers.cookie,
      session,
      req.session.user
    );
    isValid = loginResult.isLogin ? true : false;
  }
  if (isValid) {
    //사용자 확인
    console.log(today + "======");
    console.log(loginResult.userInfo);
  }

  //로그인 되었을 경우
  Object.assign(params, loginResult);
  if (isValid) {
    res.send("로그인됨");
  } else {
    res.send("로그인필요함");
  }
};

//멤버 로그인폼
const loginForm = async (req, res) => {
  const functionName = "loginForm";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);
  //const mysql = require("../mysql/index.js");

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  //let articleList; //디비 결과
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  //let falseRedirectURL = "/board/write"; //잘못되었을경우 리다이렉트 주소
  let renderURL = "login/loginForm"; //랜딩 주소
  //let boardNo;
  let params = { title: "테스트 중입니다..", length: 5 };

  //url 뷰 카운트
  if (isValid) {
    let re = moduleViewCount.urlViewCount(relativeUrl);
  }

  if (isValid) {
    //로그인 체크
    loginResult = await loginCheckModule.loginCheck(
      req.headers.cookie,
      session,
      req.session.user
    );
    isValid = loginResult.isLogin ? true : false;
  }
  if (isValid) {
    //사용자 확인
    console.log(today + "======");
    console.log(loginResult.userInfo);
  }

  //session 확인
  console.log(today + "======");
  console.log(session);

  //로그인 되었을 경우
  Object.assign(params, loginResult);
  if (isValid) {
    res.redirect(redirectURL);
  } else {
    res.render(renderURL, params);
  }
};

//멤버 로그인 로직
const memberLogin = async (req, res) => {
  const functionName = "memberLogin";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  const mysql = require("../mysql/index.js");

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  //let articleList; //디비 결과
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  let falseRedirectURL = "/login/loginForm"; //잘못되었을경우 리다이렉트 주소
  let errMsg;
  //let renderURL = "board/articleList2"; //랜딩 주소
  //let boardNo;

  //url 뷰 카운트
  if (isValid) {
    let re = moduleViewCount.urlViewCount(relativeUrl);
  }

  if (isValid) {
    //로그인 체크
    loginResult = await loginCheckModule.loginCheck(
      req.headers.cookie,
      session,
      req.session.user
    );
    isValid = !loginResult.isLogin ? true : false;
  }
  if (!isValid) {
    //사용자 확인
    console.log(today + "======");
    console.log(loginResult.userInfo);
    errMsg = "로그인되어있음.";
    //redirectURL = redirectURL + "?msg=로그인되어있음.";
  }

  //console.log(req.body);

  //const { member_id, member_pw } = req.body;

  let member_id = req.body.member_id;
  if (isValid) {
    isValid = req.body.member_id == undefined ? false : true;
  }
  let member_pw = req.body.member_pw;
  if (isValid) {
    isValid = req.body.member_pw == undefined ? false : true;
  }

  if (member_id == "" || member_pw.length == "") {
    isValid = false;
  }

  if (isValid) {
    const members = await mysql.query("memberOne", member_id);
    console.log(today + "======");
    console.log(members);
    //console.log(members.length);
    isValid = members.length > 0 ? true : false;

    //복호화
    if (isValid) {
      let gotCryptoPieces = await moduleSaltCrypto.getCrytoPassword(
        member_pw, //기입된 암호
        members[0].member_pw_salt //디비에서 가져온 솔트
      );
      console.log(today + "======");
      console.log("복호화");
      console.log(gotCryptoPieces.password);
      console.log(gotCryptoPieces.salt);

      //암호 확인
      isValid = gotCryptoPieces.password == members[0].member_pw ? true : false;

      if (isValid) {
        //세션 생성
        await loginCheckModule.makeSession(
          req.session,
          res,
          session,
          members[0]
        );
      } else {
        errMsg = "비밀번호가 다릅니다.";
        //등록되지 않은 회원입니다.비밀번호가 다릅니다.
      }
    } else {
      errMsg = "등록되지 않은 회원입니다.";
    }
  }

  /** 암호화 되지 않은 패스워드 확인
  if (isValid) {
    let params = [member_id, member_pw];
    const members = await mysql.query("memberListOneCheck", params);
    console.log(members);

    console.log(members.length);
    isValid = members.length > 0 ? true : false;

    if (isValid) {
      //세션 생성
      await loginCheckModule.makeSession(res, session, members[0].member_id);
    }
  }
   */

  //세션을 만든후 다시 로그인 되었는지 확인
  if (isValid) {
    //로그인 체크
    loginResult = await loginCheckModule.loginCheck(
      req.headers.cookie,
      session,
      req.session.user
    );
    isValid = loginResult.isLogin ? true : false;
  }

  if (isValid) {
    //메일링 기능 추가

    console.log(loginResult);

    let subjectStr =
      "안녕하세요" + loginResult.userInfo + " 사용자가 로그인 하였습니다.";
    let textStr = loginResult.userInfo + " 사용자가 로그인 하였습니다.";

    let params = {
      from: "ncware@gmail.com",
      to: "chunwoo84@hanmail.net",
      subject: subjectStr,
      text: textStr,
    };
    const r = await moduleMailing.googleMail(params);
    console.log("r:");
    console.log(r);
  }

  if (isValid) {
    //로그인 성공시

    /* 
    //세션 넣기 /////////////
    const privateKey = Math.floor(Math.random() * 1000000000);
    console.log(privateKey);
    session[privateKey] = members[0].member_id;
    console.log(session);

    res.clearCookie("connectid");
    res.clearCookie("connect.id");
    res.cookie("connect.id", privateKey, {
      path: "/",
      maxAge: 3000000,
    });
    */

    console.log(today + "======");
    console.log("로그인 완료");
    errMsg = "로그인 하셨군요 반갑습니다.";

    res.send(`
      <script>
        alert('${errMsg}')
        location.href = '${redirectURL}'
      </script>`);
    // res.redirect(redirectURL);
  } else {
    /**
    res.render(redirectPage, {
      title: "나는 나는 남천우 입니다.",
      length: 5,
    });
   */
    //res.send(members);
    //res.redirect(falseRedirectURL);

    if (errMsg) {
      res.send(`
      <script>
        alert('${errMsg}')
        location.href = '${falseRedirectURL}'
      </script>`);
    } else {
      res.redirect(falseRedirectURL);
    }
  }
};

//멤버 로그아웃 로직
const loginOut = async (req, res) => {
  const functionName = "loginOut";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);
  //const mysql = require("../mysql/index.js");

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  //let articleList; //디비 결과
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  let falseRedirectURL = "/login/loginHome"; //잘못되었을경우 리다이렉트 주소
  //let renderURL = "board/articleList2"; //랜딩 주소
  let errMsg;
  let params = { title: "테스트 중입니다..", length: 5 };

  //url 뷰 카운트
  if (isValid) {
    let re = moduleViewCount.urlViewCount(relativeUrl);
  }

  if (isValid) {
    //로그인 체크
    loginResult = await loginCheckModule.loginCheck(
      req.headers.cookie,
      session,
      req.session.user
    );
    isValid = loginResult.isLogin ? true : false;
  }
  if (isValid) {
    //사용자 확인
    console.log(today + "======");
    console.log(loginResult.userInfo);
  }

  //로그인 되었을 경우
  Object.assign(params, loginResult);
  if (isValid) {
    //로그아웃
    await loginCheckModule.deleteSession(req, res, session);
    errMsg = "다시 돌아와요~~ㅠㅠ";
    //res.redirect(redirectURL);
    res.send(`
      <script>
        alert('${errMsg}')
        location.href = '${redirectURL}'
      </script>`);
  } else {
    res.redirect(falseRedirectURL);
    //res.render("login/loginForm", params);
  }
};

exports.joinForm = joinForm;
exports.memberJoin = memberJoin;
exports.loginForm = loginForm;
exports.memberLogin = memberLogin;
exports.loginConfirm = loginConfirm;
exports.loginOut = loginOut;
exports.loginHome = loginHome;
