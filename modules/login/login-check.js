const cookie = require("cookie"); //cookie 모듈

const classUser = require("./classUser"); //classUser 모듈

/**  */
//세션 체크
const loginCheck_express = async (getCookie, session, user) => {
  // user 는 req.session.user
  //객체 생성
  const classU = new classUser(false, false, false);

  ///let isLogin = false;
  ///let userInfo = false;
  ///let userNm = false;

  if (user) {
    classU.setIsLogin(user.isLogin);
    classU.setUserInfo(user.userInfo);
    classU.setUserNm(user.userNm);

    ///isLogin = classU.getIsLogin();
    ///userInfo = classU.getUserInfo();
    ///userNm = classU.getUserNm();
    ///isLogin = user.isLogin;
    ///userInfo = user.userInfo;
    ///userNm = user.userNm;
    console.log("로그인 된 상태");
    console.log(user);
  } else {
    console.log("로그인 되지 않은 상태");
  }

  return await {
    isLogin: classU.getIsLogin(),
    userInfo: classU.getUserInfo(),
    userNm: classU.getUserNm(),
  };
};

//세션 모듈 사용
//const sessionModule = require("../session/express-session");
//app.use(sessionModule.session);

//세션 생성
const makeSession_express = async (
  reqSession,
  res,
  session,
  member,
  paramList
) => {
  let isLogin = false;
  let userInfo = false;

  //req.session. 에 저장공간 .user 을 만들어 저장함.

  //
  reqSession.user = {
    isLogin: true,
    userInfo: member.member_id,
    userNm: member.member_nm,
    //userEmail : member.email
    kakaoToken: paramList.kakaoToken,
  };
  console.log(reqSession.user);
};
//세션 삭제
const deleteSession_express = async (req, res, session) => {
  req.session.destroy(() => {
    req.session;
  });
  console.log(req.session);
};

/////////위쪽은 session-express 를 이용한 session 사용
/////////아래쪽은 쿠키를 이용하여 직접 코딩

//세션 체크
const loginCheck = async (getCookie, session, user) => {
  let isLogin = false;
  let userInfo = false;
  if (getCookie) {
    console.log("쿠키확인!");
    //console.log(req.headers.cookie);
    //const connectid = req.headers.cookie.lastIndexOf("connectid");
    //const connectid = req.cookies["connectid"];
    const cookies = cookie.parse(getCookie);
    //console.log(cookies["connect.id"]); // cookie 모듈을 통해 헤더를 파싱한 결과 출력
    const privateKey = cookies["connect.id"];
    userInfo = session[privateKey];
    //console.log(userInfo);
    //console.log(privateKey);

    if (userInfo) {
      console.log("로그인 된 상태");
      isLogin = true;
    } else {
      isLogin = false;
      console.log("로그인 되지 않은 상태");
    }
  }
  return await {
    isLogin: isLogin,
    userInfo: userInfo,
  };
};

/**
const cookie = require("cookie");
const loginCheck = async (param) => {
  let isLogin = false;
  let userInfo = false;
  if (param) {
    console.log("쿠키확인!");
    //console.log(req.headers.cookie);
    //const connectid = req.headers.cookie.lastIndexOf("connectid");
    //const connectid = req.cookies["connectid"];
    const cookies = cookie.parse(param);
    //console.log(cookies["connect.id"]); // cookie 모듈을 통해 헤더를 파싱한 결과 출력
    const privateKey = cookies["connect.id"];
    const userInfo = session[privateKey];
    //console.log(userInfo);
    //console.log(privateKey);

    if (userInfo) {
      console.log("로그인 된 상태");
      isLogin = true;
    } else {
      isLogin = false;
      console.log("로그인 되지 않은 상태");
    }
    isLogin: true;
  }
  return await {
    isLogin: isLogin,
    userInfo: userInfo,
  };
};
 */

//세션 생성 : 암호화가 필요함.
const makeSession = async (reqSession, res, session, member_id, paramList) => {
  let isLogin = false;
  let userInfo = false;

  //기존 세션에 중복된 값이 있는지 체크
  const makePrivateKey = () => {
    let key = Math.floor(Math.random() * 1000000000);
    let userYn = session[key];
    console.log("session = =");
    console.log(session);
    if (userYn) {
      console.log("기존에 값이 있음. 로그인 된 상태");
      return makePrivateKey();
    } else {
      console.log("기존에 값이 없음. 로그인 되지 않은 상태");
      return key;
    }
  };

  //세션 넣기 /////////////
  let privateKey = makePrivateKey();
  console.log(privateKey + ": privateKey");
  session[privateKey] = member_id;
  console.log(session);

  //res.setHeader("Set-Cookie", `connect.id=; path=/`);
  //res.setHeader("Set-Cookie", `connect.id=${privateKey}; path=/`);
  //res.setHeader("Set-Cookie", `connectid=${privateKey}; path=/`);
  ///////////////////

  //res.clearCookie("connectid");
  res.clearCookie("connect.id");
  res.cookie("connect.id", privateKey, {
    path: "/",
    maxAge: 60 * 60 * 1000,
    httpOnly: true, //클라이언트에서 접근 불가
  });
};

//세션 삭제
const deleteSession = async (req, res, session) => {
  console.log(session);
  const cookies = cookie.parse(req.headers.cookie);
  //console.log(cookies["connect.id"]); // cookie 모듈을 통해 헤더를 파싱한 결과 출력
  const privateKey = cookies["connect.id"];
  const userInfo = session[privateKey];
  delete session[privateKey];
  res.cookie("connect.id", "delete", {
    path: "/",
    maxAge: 0,
  });
  //res.setHeader("Set-Cookie", "connect.id=delete; Max-age=0; path=/");
  res.clearCookie("connect.id");
};

exports.loginCheck = loginCheck_express;
exports.makeSession = makeSession_express;
exports.deleteSession = deleteSession_express;

//exports.loginCheck = loginCheck;
//exports.makeSession = makeSession;
//exports.deleteSession = deleteSession;
