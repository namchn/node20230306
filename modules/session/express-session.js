//전역변수  세션 선언
const session = require("express-session");
const MemoryStore = require("memorystore")(session); //메모리저장
const fileStore = require("session-file-store")(session); //파일저장

//setting 값 설정
const path = require("path");
const moduleFs = require("../fs/fs");
const systemPath = path.join(__dirname, "/../../_set/system_setting.json");
const json = JSON.parse(moduleFs.readFileSync(systemPath)); //JSON.stringify(result);

//session 설정값
let sessionObj;
let sessionStoreMethod = json.setting.expressSession.store;
let sessionSecure = json.setting.expressSession.secure;
let sessionSecret = json.setting.expressSession.secret;
let sessionResave = json.setting.expressSession.resave;
let sessionSaveUninitialized = json.setting.expressSession.saveUninitialized;
let cookieMaxAge = 1000 * 60 * Number(json.setting.expressSession.maxAgeMinute);
let cookieHttpOnly = json.setting.expressSession.cookie.httpOnly;
let cookieSecure = json.setting.expressSession.cookie.secure;
let sessionName = json.setting.expressSession.name;

//불러오는 방식을 무엇으로 할지..
require("dotenv").config({ path: "_set/.env" });
/* sessionStoreMethod = process.env.SESSION_STORE_METHOD;
sessionSecure =process.env.SESSION_SECURE
sessionSecret =process.env.SESSION_SECRET
sessionResave =process.env.SESSION_RESAVE
sessionSaveUninitialized =process.env.SESSION_SAVE_UNINITIALIZED
cookieMaxAge = 1000 * 60 * Number(process.env.MAX_AGE_MINUTE)
cookieHttpOnly = process.env.COOKEI_HTTP_ONLY;
cookieSecure = process.env.COOKEI_SECURE
sessionName = process.env.SESSION_NAME; */

console.log("===============================================");

//session 저장 방식
let cookieStore;
if (sessionStoreMethod == "fileStore") {
  cookieStore = new fileStore();
} else if (sessionStoreMethod == "DB") {
  cookieStore = new MemoryStore({ checkPeriod: cookieMaxAge });
} else {
  //MemoryStore
  cookieStore = new MemoryStore({ checkPeriod: cookieMaxAge });
}

sessionObj = {
  secure: sessionSecure, // https 환경에서만 session 정보를 주고받도록처리
  secret: sessionSecret, // 암호화하는 데 쓰일 키
  resave: sessionResave, // 세션을 같을경우에도 언제나 다시 저장할지 설정함
  saveUninitialized: sessionSaveUninitialized, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정

  cookie: {
    maxAge: cookieMaxAge,
    httpOnly: cookieHttpOnly, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    Secure: cookieSecure,
  },
  store: cookieStore,
  name: sessionName, // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름('session-cookie')을 줄수도 있다.
};

/*
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const maxAge = 1000 * 60 * 39;
const sessionObj = {
  //secure: ture,	// https 환경에서만 session 정보를 주고받도록처리
  secret: "secret", // 암호화하는 데 쓰일 키
  resave: false, // 세션을 같을경우에도 언제나 다시 저장할지 설정함
  saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
  store: new MemoryStore({ checkPeriod: maxAge }),
  cookie: {
    maxAge: maxAge,
    httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    //Secure: true
  },
  //name: 'session-cookie' // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.
};
*/

exports.session = session(sessionObj);
//exports.test = session(sessionObj);
