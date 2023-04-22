const jsName = "/login";

//경로 모듈
const path = require("path");
// 시간 모먼트js
const moment = require("moment");
require("moment-timezone");
//현재시간
moment.tz.setDefault("Asia/Seoul");

//설정값
require("dotenv").config({ path: "_set/.env" });

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
const moduleMailing = require("../modules/mailing/google_mail");
//스케쥴 모듈
const modulescheduling = require("../modules/scheduling/scheduling");
//파일 모듈
const moduleFs = require("../modules/fs/fs");
//스크립트 모듈
const moduleAlertMove = require("../modules/util/alertMove");
//에러 constructor
const HttpError = require("../modules/http-error");
//에러 constructor
const moduleKakao = require("../modules/login/kakao");
/////////////////////////////////////////////////////////////////////

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

  //res.redirect("/client/views/home/home.html");

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
  //res.redirect("/login/joinForm.html");
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
  //res.redirect("/login/joinForm.html");
};

//멤버 가입하기 로직
const memberJoin = async (req, res) => {
  const functionName = "memberJoin";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

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

  const { member_id, member_nm, member_pw, member_pw2 } = req.body;

  //let member_id = req.body.member_id;
  if (isValid) {
    isValid = member_id == undefined ? false : true;
    if (!isValid) {
      errMsg = "아이디 값이 없음";
      const error = new HttpError(errMsg, 406);
      console.log(error);
      //throw error;
    }
  }

  //let member_nm = req.body.member_nm;
  if (isValid) {
    isValid = member_nm == undefined ? false : true;
    if (!isValid) {
      errMsg = "이름이 없음";
      const error = new HttpError(errMsg, 406);
      console.log(error);
      //throw error;
    }
  }

  //let member_pw = req.body.member_pw;
  if (isValid) {
    isValid = member_pw == undefined ? false : true;
    if (!isValid) {
      errMsg = "첫번째 패스워드가 없음";
      const error = new HttpError(errMsg, 406);
      console.log(error);
      //throw error;
    }
  }

  //let member_pw2 = req.body.member_pw2;
  if (isValid) {
    isValid = member_pw2 == undefined ? false : true;
    if (!isValid) {
      errMsg = "두번째 패스워드가 없음";
      const error = new HttpError(errMsg, 406);
      console.log(error);
      //throw error;
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
    const error = new HttpError(errMsg, 406);
    console.log(error);
    //throw error;
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

    const checked = await moduleMysql.query("memberListOne", member_id);
    console.log(today + "======");
    console.log(checked.length + " : 아이디 중복");
    isValid = checked.length > 0 ? false : true;

    if (!isValid) {
      errMsg = "중복된 아이디입니다. ";
      const error = new HttpError(errMsg, 406);
      console.log(error);
      //throw error;
    }
  }

  if (isValid) {
    const result = await moduleMysql.query("memberInsertOne", params);
    console.log(today + "======");
    console.log(result.affectedRows);
    isValid = result.affectedRows != 1 ? false : true;
    if (!isValid) {
      errMsg = "회원가입에 실패하였습니다 다시 시도하여 주십시오. ";
      const error = new HttpError(errMsg, 406);
      console.log(error);
      //throw error;
    }
  }

  //console.log(" 비밀번호가 다르다 : " + isValid);

  if (isValid) {
    errMsg = "축하합니다. 가입되었습니다!";
    res.send(await moduleAlertMove.alertMove(errMsg, redirectURL));
    //res.redirect(redirectURL);
  } else {
    //가입 실패시 로직
    if (errMsg) {
      res.send(await moduleAlertMove.alertMove(errMsg, falseRedirectURL));
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
    console.log(today + "====== : " + loginResult.userInfo);
    errMsg = "로그인되어있음.";
    const error = new HttpError(errMsg, 400);
    console.log(error);
    //throw error;
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
    const members = await moduleMysql.query("memberOne", member_id);
    console.log(today + "======");
    console.log(members);
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
      //const [data] = members[0].filter(v => (v.member_pw == gotCryptoPieces.password ) );

      if (isValid) {
        //세션 생성
        await loginCheckModule.makeSession(
          req.session,
          res,
          session,
          members[0],
          {}
        );
      } else {
        errMsg = "비밀번호가 다릅니다.";
        const error = new HttpError(errMsg, 406);
        console.log(error);
        //throw error;
      }
    } else {
      errMsg = "등록되지 않은 회원입니다.";
      const error = new HttpError(errMsg, 406);
      console.log(error);
      //throw error;
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

    /* req.session.save(async (err) => {
      if (err) throw err;
      res.send(await moduleAlertMove.alertMove(errMsg, redirectURL));
    }); */
    res.send(await moduleAlertMove.alertMove(errMsg, redirectURL));
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
      res.send(await moduleAlertMove.alertMove(errMsg, falseRedirectURL));
    } else {
      res.redirect(falseRedirectURL);
    }
  }
};

//멤버 로그아웃 로직
const loginOut = async (req, res, next) => {
  const functionName = "loginOut";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

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
    console.log(today + "====== :" + loginResult.userInfo);
  }

  //로그인 되었을 경우
  Object.assign(params, loginResult);
  if (isValid) {
    //카카오로그인시
    if (req.session.user.kakaoToken) {
      moduleKakao.logout(req.session.user.kakaoToken, next);
    }
    //로그아웃
    await loginCheckModule.deleteSession(req, res, session);
    errMsg = "다시 돌아와요~~ㅠㅠ";
    //res.redirect(redirectURL);
    res.send(await moduleAlertMove.alertMove(errMsg, redirectURL));
  } else {
    res.redirect(falseRedirectURL);
    //res.render("login/loginForm", params);
  }
};

//카카오 로그인
const kakaoLogin = async (req, res, next) => {
  //const OPERATION = process.env.OPERATION;
  const MY_DOMAIN = process.env.MY_DOMAIN;
  const REST_API_KEY = process.env.REST_API_KEY;
  const REDIRECT_URI = MY_DOMAIN + "/login/oauth/kakao";

  const kakaoDomain = "https://kauth.kakao.com";
  const kakaoUrl = `/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  //res.send("");
  return res.redirect(kakaoDomain + kakaoUrl);
};

//REDIRECT_URI
const oauthKakao = async (req, res, next) => {
  const query = req.query;

  //console.log("query.code : ");
  //console.log(query.code);
  //console.log(req.originalUrl);

  //const OPERATION = process.env.OPERATION;
  const MY_DOMAIN = process.env.MY_DOMAIN;
  const REST_API_KEY = process.env.REST_API_KEY;
  const REDIRECT_URI = MY_DOMAIN + "/login/oauth/kakao";

  const axios = require("axios");

  /* let form = {
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: query.code,
  };
 */
  //encodeURIComponent( REDIRECT_URI)

  let tokenData;

  if (query.code) {
    try {
      const response = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${query.code}`,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const data = response.data;

      tokenData = data;

      //return res.send(tokenData.access_token);
      //console.log(data.results);
    } catch (error) {
      return next(error);
    }
  } else {
    return res.redirect("/");
  }

  //
  let userData;
  try {
    if ("access_token" in tokenData) {
      const { access_token } = tokenData;
      const response = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          //"Content-type": "application/x-www-form-urlencoded",
        },
      });
      const data = response.data;
      userData = data;
      //res.send(data);
    } else {
      //res.send(tokenData);
    }

    //console.log(data.results);
  } catch (error) {
    return next(error);
  }

  if (userData) {
    //로그인 과정
    //let loginData;
    let form = {
      member_id: userData.id + "",
      //member_id: userData.id,
      member_nm: userData.properties.nickname,
      member_pw: userData.id + "",
      member_pw2: userData.id + "",
    };

    /* let form = {
      member_id: userData.kakao_account.email,
      member_nm: userData.properties.nickname,
      member_pw: userData.kakao_account.email,
      member_pw2: userData.kakao_account.email,
    } */

    let isValid = true;
    let errMsg = "";
    let member;
    let redirectURL = "/";
    let today = moment().format();

    //아이디 중복 체크부분
    try {
      const checked = await moduleMysql.query("memberListOne", form.member_id);
      console.log(today + "======");
      isValid = checked.length > 0 ? false : true;

      if (!isValid) {
        member = checked[0];
        //errMsg = "중복된 아이디입니다. ";
        //const error = new HttpError(errMsg, 406);
        //console.log(error);
        //throw error;
      }
    } catch (error) {
      next(error);
    }

    if (isValid) {
      //암호화
      let createdCryptoPieces = await moduleSaltCrypto.createCryptoPassword(
        form.member_pw
      );

      let params = [
        form.member_id,
        form.member_nm,
        createdCryptoPieces.password,
        createdCryptoPieces.salt,
      ];

      try {
        const result = await moduleMysql.query("memberInsertOne", params);
        console.log(today + "======");
        console.log(result.affectedRows);
        isValid = result.affectedRows != 1 ? false : true;
        if (!isValid) {
          errMsg = "회원가입에 실패하였습니다 다시 시도하여 주십시오. ";
          const error = new HttpError(errMsg, 406);
          console.log(error);
          //throw error;
        }
      } catch (error) {
        next(error);
      }
    }

    if (isValid) {
      try {
        const checked = await moduleMysql.query(
          "memberListOne",
          form.member_id
        );
        console.log(today + "======");
        isValid = checked.length > 0 ? true : false;

        if (isValid) {
          member = checked[0];
          //errMsg = "중복된 아이디입니다. ";
          //const error = new HttpError(errMsg, 406);
          //console.log(error);
          //throw error;
        }
      } catch (error) {
        next(error);
      }
    }

    //세션 생성
    if (member) {
      await loginCheckModule.makeSession(req.session, res, session, member, {
        kakaoToken: tokenData.access_token,
      });
      errMsg = "로그인 하셨군요 반갑습니다.";
      //res.redirect("/");
    } else {
      errMsg = "카카오 로그인이 안되었어요ㅠㅠ";
    }
    return res.send(await moduleAlertMove.alertMove(errMsg, redirectURL));
  } else {
    return res.send("로그인 오류");
  }
  //res.redirect(kakaoUrl);
};

module.exports = {
  joinForm,
  memberJoin,
  loginForm,
  memberLogin,
  loginConfirm,
  loginOut,
  loginHome,
  kakaoLogin,
  oauthKakao,
};

//exports.joinForm = joinForm;
//exports.memberJoin = memberJoin;
//exports.loginForm = loginForm;
//exports.memberLogin = memberLogin;
//exports.loginConfirm = loginConfirm;
//exports.loginOut = loginOut;
//exports.loginHome = loginHome;
