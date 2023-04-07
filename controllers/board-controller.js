const jsName = "/board";

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
const moduleMailing = require("../modules/mailing/google_mail");
//스케쥴 모듈
const modulescheduling = require("../modules/scheduling/scheduling");
//파일 모듈
const moduleFs = require("../modules/fs/fs");
//스크립트 모듈
const moduleAlertMove = require("../modules/util/alertMove");
//에러 constructor
const HttpError = require("../modules/http-error");
/////////////////////////////////////////////////////////////////////

//글쓰기 폼
const writeForm = async (req, res) => {
  const functionName = "writeForm";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  let renderURL = "board/write"; //랜딩 주소
  //let articleList; //디비 결과
  let boardNo;

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

  if (isValid) {
    //쿼리값 확인
    isValid = req.query.board_no == undefined ? false : true;
  }

  if (isValid) {
    //유효성 체크 : 숫자만 있는지 확인
    isValid = await validCheckModule.testRegex(/^\d+$/, req.query.board_no);
    boardNo = req.query.board_no;
  }

  if (isValid) {
    let params = {
      title: "테스트 중입니다..",
      length: 5,
      writer_nm: loginResult.userNm,
    };
    Object.assign(params, loginResult);
    Object.assign(params, {
      params,
      moment,
      board_no: boardNo,
    });

    res.render(renderURL, params);
  } else {
    res.redirect(redirectURL);
  }
};

//글쓰기 insert
const insert = async (req, res) => {
  const functionName = "insert";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  let articleList; //디비 결과
  let redirectURL = "/board/list"; //리다이렉트 주소
  let falseRedirectURL = "/board/write"; //잘못되었을경우 리다이렉트 주소
  //let renderURL = "board/articleList2"; //랜딩 주소
  let writer_id;
  let errMsg;

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
    console.log("사용자 확인: " + loginResult.userInfo);

    writer_id = loginResult.userInfo;
  }

  let writer_nm = req.body.writer_nm;
  if (isValid) {
    isValid = req.body.writer_nm == undefined ? false : true;
  }
  let title = req.body.title;
  if (isValid) {
    isValid = req.body.title == undefined ? false : true;
  }
  let text = req.body.text;
  if (isValid) {
    isValid = req.body.text == undefined ? false : true;
  }
  let board_no = req.body.board_no;
  if (isValid) {
    isValid = req.body.board_no == undefined ? false : true;
  }
  if (isValid) {
    //유효성 체크 : 숫자만 있는지 확인
    isValid = await validCheckModule.testRegex(/^\d+$/, req.body.board_no);
  }

  //게시글  인서트
  if (isValid) {
    let params = [writer_id, writer_nm, title, text, board_no];
    const result = await moduleMysql.query("articleInsertOne", params);

    if (result.affectedRows == 1) {
      console.log(result);
    } else {
      isValid = false;
    }
  }

  if (isValid) {
    redirectURL = redirectURL + "?board_no=" + board_no;
    errMsg = "글이 작성되었습니다.";

    res.send(await moduleAlertMove.alertMove(errMsg, redirectURL));

    //res.redirect(redirectURL);
  } else {
    res.redirect(falseRedirectURL);
  }
};

//게시글 리스트
const writeList = async (req, res) => {
  const functionName = "writeList";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  let articleList; //디비 결과
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  let renderURL = "board/articleList2"; //랜딩 주소
  let boardNo;

  //url 뷰 카운트
  if (isValid) {
    let re = moduleViewCount.urlViewCount(relativeUrl);
  }

  if (isValid) {
    //쿼리값 확인
    isValid = req.query.board_no == undefined ? false : true;
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
    //유효성 체크 : 숫자만 있는지 확인
    isValid = await validCheckModule.testRegex(/^\d+$/, req.query.board_no);
    //const regex = /^\d+$/;
    //a = req.query.board_no;
    //c = a.match(regex);
    //console.log(c); // null
    boardNo = req.query.board_no;
  }

  if (isValid) {
    //디비 커넥션
    articleList = await moduleMysql.query("articleList", boardNo);
  }

  /**
  let list = [];
  for (var i = 0; i < articleList.length; i++) {
    //console.log(articleList[i].writer_nm);
    list.push(articleList[i].writer_nm);
  }
   */

  //로그인 되었을 경우
  if (isValid) {
    //로그인이 되어 있을때만 리스트로 들어올 수 있다.
    let params = { title: "테스트 중입니다..", length: 5 };
    Object.assign(params, loginResult);
    Object.assign(params, {
      list: articleList,
      moment,
      board_no: boardNo,
    });
    res.render(renderURL, params);
    //res.send(members);
  } else {
    res.redirect(redirectURL);
  }
};

//게시글 상세보기
const view = async (req, res) => {
  const functionName = "view";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  let articleOne; //디비 결과
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  //let falseRedirectURL = "/board/write"; //잘못되었을경우 리다이렉트 주소
  let renderURL = "board/view"; //랜딩 주소
  let boardNo;
  let articleNo;
  let member_id;
  let authYn = false;

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
    console.log(today + "======");
    console.log("사용자 확인: " + loginResult.userInfo);
    member_id = loginResult.userInfo;
  }

  if (isValid) {
    //쿼리값 확인
    isValid = req.query.article_no == undefined ? false : true;
  }

  console.log(today + "======");
  console.log("article_no: " + req.query.article_no);

  if (isValid) {
    //유효성 체크 : 숫자만 있는지 확인
    isValid = await validCheckModule.testRegex(/^\d+$/, req.query.article_no);
    articleNo = req.query.article_no;
  }
  /**  */
  //params = { member_id: "admin" };

  if (isValid) {
    articleOne = await moduleMysql.query("articleView", articleNo);

    isValid = articleOne.length > 0 ? true : false;

    if (isValid) {
      //작성자와 접속자의 일치여부 확인
      if (member_id == articleOne[0].writer_id) {
        authYn = true;
        console.log("작성자와 접속자가 일치함.");
      }

      let clickCnt = articleOne[0].click_cnt + 1;
      let params = [clickCnt, articleNo];
      console.log(today + "======");
      console.log("clickCnt: " + clickCnt);
      //click_cnt 업데이트
      const result = await moduleMysql.query("articleClickUpdate", params);
    }
  }

  /**
  let list = [];
  for (var i = 0; i < articleList.length; i++) {
    console.log(articleList[i].writer_nm);
    list.push(articleList[i].writer_nm);
  }
   */

  if (isValid) {
    let params = { title: "테스트 중입니다..", length: 5 };
    Object.assign(params, loginResult);
    Object.assign(params, {
      article: articleOne,
      moment,
      authYn,
      article_no: articleNo,
      board_no: req.query.board_no,
    });
    res.render(renderURL, params);
  } else {
    res.redirect(redirectURL);
  }

  //res.send(members);
};

//게시글 수정폼
const editForm = async (req, res) => {
  const functionName = "editForm";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  let articleOne; //디비 결과
  let redirectURL = "/login/loginHome"; //리다이렉트 주소
  //let falseRedirectURL = "/board/write"; //잘못되었을경우 리다이렉트 주소
  let renderURL = "board/edit"; //랜딩 주소
  let boardNo;
  let articleNo;
  let member_id;
  //let params;

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
    console.log(today + "======");
    console.log("사용자 확인: " + loginResult.userInfo);
    member_id = loginResult.userInfo;
  }

  if (isValid) {
    //쿼리값 확인
    isValid = req.query.article_no == undefined ? false : true;
    articleNo = req.query.article_no;
  }

  /**  */
  if (isValid) {
    articleOne = await moduleMysql.query("articleView", articleNo);

    //작성자와 접속자의 일치여부 확인
    isValid = member_id == articleOne[0].writer_id ? true : false;
    if (!isValid) console.log("작성자와 접속자가 일치하지 않음");
  }
  //params = { member_id: "admin" };

  /**
  let list = [];
  for (var i = 0; i < articleList.length; i++) {
    console.log(articleList[i].writer_nm);
    list.push(articleList[i].writer_nm);
  }
   */

  if (isValid) {
    let params = { title: "테스트 중입니다..", length: 5 };
    Object.assign(params, loginResult);
    Object.assign(params, {
      article: articleOne,
      moment,
      article_no: articleNo,
      board_no: req.body.board_no,
    });

    res.render(renderURL, params);
  } else {
    res.redirect(redirectURL);
  }

  //res.send(members);
};

//글쓰기 update
const update = async (req, res) => {
  const functionName = "update";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  //let articleList; //디비 결과
  let redirectURL = "/board/view"; //리다이렉트 주소
  let falseRedirectURL = "/board/list"; //잘못되었을경우 리다이렉트 주소
  //let renderURL = "board/articleList2"; //랜딩 주소
  //let boardNo;
  let articleNo;
  let member_id;
  let errMsg;

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
    console.log("사용자 확인: " + loginResult.userInfo);
    member_id = loginResult.userInfo;
  }

  if (isValid) {
    //쿼리값 확인
    isValid = req.body.article_no == undefined ? false : true;
  }
  if (isValid) {
    //유효성 체크 : 숫자만 있는지 확인
    isValid = await validCheckModule.testRegex(/^\d+$/, req.body.article_no);
    articleNo = req.body.article_no;
    console.log(today + "======");
    console.log("articleNo : " + articleNo);
  }

  if (isValid) {
    articleOne = await moduleMysql.query("articleView", articleNo);
    isValid = articleOne.length > 0 ? true : false;

    //작성자와 접속자의 일치여부 확인
    if (isValid) {
      isValid = member_id == articleOne[0].writer_id ? true : false;
      if (!isValid) {
        console.log("작성자와 접속자가 일치하지 않음");
      }
    }
  }

  let writer_nm = req.body.writer_nm;
  if (isValid) {
    //쿼리값 확인
    isValid = req.body.writer_nm == undefined ? false : true;
  }

  let title = req.body.title;
  if (isValid) {
    //쿼리값 확인
    isValid = req.body.title == undefined ? false : true;
  }

  let text = req.body.text;
  if (isValid) {
    //쿼리값 확인
    isValid = req.body.text == undefined ? false : true;
  }

  let board_no = req.body.board_no;
  if (isValid) {
    //쿼리값 확인
    isValid = req.body.board_no == undefined ? false : true;
  }

  let params = [writer_nm, title, text, board_no, articleNo];

  //글 수정
  if (isValid) {
    const result = await moduleMysql.query("articleUpdateOne", params);

    console.log(today + "======");
    console.log(result);
    if (!result.affectedRows == 1) {
      isValid = false;
    }
  }

  if (isValid) {
    redirectURL = redirectURL + "?article_no=" + articleNo;
    errMsg = "글이 수정되었습니다.";

    res.send(await moduleAlertMove.alertMove(errMsg, redirectURL));

    //res.redirect(redirectURL);
  } else {
    falseRedirectURL = falseRedirectURL + "?board_no=" + board_no;
    res.redirect(falseRedirectURL);
  }
};

//글쓰기 delete
const deleteOne = async (req, res) => {
  const functionName = "deleteOne";
  const relativeUrl = jsName + "/" + functionName;
  let today = moment().format();
  console.log(today + "======");
  console.log(relativeUrl);

  let isValid = true; //로직 통과 체크
  let loginResult; //로그인 결과 체크
  //let articleList; //디비 결과
  let redirectURL = "/board/list"; //리다이렉트 주소
  let falseRedirectURL = "/board/view"; //잘못되었을경우 리다이렉트 주소
  //let renderURL = "board/articleList2"; //랜딩 주소
  //let boardNo;
  let articleNo;
  let member_id;
  let errMsg;

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
    console.log("사용자 확인: " + loginResult.userInfo);
    member_id = loginResult.userInfo;
  }

  if (isValid) {
    //쿼리값 확인
    isValid = req.query.article_no == undefined ? false : true;
  }
  if (isValid) {
    //유효성 체크 : 숫자만 있는지 확인
    isValid = await validCheckModule.testRegex(/^\d+$/, req.query.article_no);
    articleNo = req.query.article_no;
    console.log(today + "======");
    console.log("articleNo : " + articleNo);
  }

  if (isValid) {
    articleOne = await moduleMysql.query("articleView", articleNo);
    isValid = articleOne.length > 0 ? true : false;

    //작성자와 접속자의 일치여부 확인
    if (isValid) {
      isValid = member_id == articleOne[0].writer_id ? true : false;
      if (!isValid) {
        console.log("작성자와 접속자가 일치하지 않음");
      }
    }
  }

  let board_no = req.query.board_no;
  if (isValid) {
    //쿼리값 확인
    isValid = req.query.board_no == undefined ? false : true;
  }
  if (isValid) {
    //유효성 체크 : 숫자만 있는지 확인
    isValid = await validCheckModule.testRegex(/^\d+$/, req.query.board_no);
    board_no = req.query.board_no;
    console.log(today + "======");
    console.log("board_no : " + board_no);
  }

  let params = ["Y", articleNo];
  if (isValid) {
    const result = await moduleMysql.query("articleDeleteYnOne", params);

    console.log(today + "======");
    console.log(result);
    if (!result.affectedRows == 1) {
      isValid = false;
    }
  }

  if (isValid) {
    redirectURL = redirectURL + "?board_no=" + board_no;
    errMsg = "글이 삭제되었습니다.";

    res.send(await moduleAlertMove.alertMove(errMsg, redirectURL));

    //res.redirect(redirectURL);
  } else {
    falseRedirectURL = falseRedirectURL + "?article_no=" + articleNo;
    res.redirect(falseRedirectURL);
  }
};

module.exports = {
  writeForm,
  insert,
  writeList,
  view,
  editForm,
  update,
  deleteOne,
};

//exports.writeForm = writeForm;
//exports.insert = insert;
//exports.writeList = writeList;
//exports.view = view;
//exports.editForm = editForm;
//exports.update = update;
//exports.deleteOne = deleteOne;
