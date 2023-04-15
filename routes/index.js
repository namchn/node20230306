const express = require("express");
const router = express.Router();
const morgan = require("morgan"); //로그 관리
const fs = require("fs"); //파일 시스템
const path = require("path"); //경로
const responseTime = require("response-time"); //응답시간
const timeout = require("connect-timeout"); //지연 응답 처리
const HttpError = require("../modules/http-error"); //에러 constructor
const sessionModule = require("../modules/session/express-session");
const moduleAlertMove = require("../modules/util/alertMove");
const moduleLoginCheck = require("../modules/login/login-check");
//*cross-origin 요청: 다른 서버의 요청을 가능하게 함
const cors = require("cors"); //Cross-Origin Resource Sharing
var corsOptions = {
  origin: "*", //http://example.com
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const compression = require("compression"); //응답을 압축
const compressionOpt = {
  level: 6,
  threshold: 100 * 1000,
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      // header에 x-no-compression이 있으면, 압축하지 않도록 false를 반환한다.
      return false;
    }
    return compression.filter(req, res);
    // 없는 경우에는 압축허용
  },
};
/**
level : 압축 정도를 설정하는 것으로 -1에서 9까지 가능하다. 1이 기본 압축을 의미하며, -1은 압축을 하지 않는 것이며, nodejs 환경에서는 6으로 설정하는 것이 가장 최적화하는 수준이다.
threshold: 압축하지 않는 최소한의 크기를 설정하는 것이다. 예를 들어 threshold : 100 * 1000은 100kb아래의 데이터는 압축하지 않고, 클라이언트에게 전송한다.
filter: 특정 조건에 따라 압축을 할지 말지를 결정하는 것이다.
*/

//*세션 모듈 사용
router.use(sessionModule.session);

//*요청 body 파싱
const urlencodedParser = express.urlencoded({ extended: true });
router.use(urlencodedParser); //urlencoded 데이터 파싱
const jsonParser = express.json({ limit: "50mb" }); //최대 50메가
router.use(jsonParser); // 클라이언트 요청 body를 json으로 파싱
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//*정적파일 접근 경로 설정
router.use("/xlsx", express.static("xlsx"));
router.use("/client", express.static("client"));

//*router
const customerRoute = require("./customer"); //cutomer라우트 추가
const productRoute = require("./product"); //product라우트 추가
const loginRoute = require("./login"); //product라우트 추가
const boardRoute = require("./board"); //board라우트 추가
const dailyRoute = require("./daily"); //daily라우트 추가
const functionRoute = require("./function"); //function라우트 추가
const testRoute = require("./test"); //test라우트 추가

//* auth 세션 인증체크
const Auth = async (req, res, next) => {
  const { isLogin } = await moduleLoginCheck.loginCheck(
    null,
    null,
    req.session.user
  );
  //const { user } = req.session;
  //if (user != undefined) {
  if (isLogin) {
    console.log("good : " + isLogin);
    next();
  } else {
    //console.log(req.session);
    res.send(
      await moduleAlertMove.alertMove("로그인 후 사용해 주십시오.", "/")
    );
  }
};

//create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "/../_log/access.log"),
  { flags: "a" }
);

//*setup the logger
//router.use(morgan("combined", { stream: accessLogStream })); //로그관리

//*요청에 대한 응답 시간
router.use(
  responseTime((req, res, time) => {
    console.log(req.method + ":" + req.url + ":" + time + "ms");
    //별도의 로그기록으로 남겨서 모니터링
  })
);

//* 지정된 시간까지 응답이 없을경우 연결종료
//router.use(timeout('5s'))//5초
router.get(
  "/tout2",
  timeout("11s"),
  haltOnTimeout,
  excuteTimeout,
  (req, res, next) => {
    res.send("saved as id ");
  }
);
router.get("/tout1", timeout("0.00001s"), haltOnTimeout, (req, res, next) => {
  savePost(req.body, function (err, id) {
    console.log("haltOnTimeout 2:");
    console.log(err);
    if (err) {
      const error = new HttpError(err.message, 400); //err.statusCode
      return next(error);
      //return next(err);
    }
    if (req.timedout) return;
    res.send("saved as id " + id);
  });
});
function haltOnTimeout(req, res, next) {
  console.log("haltOnTimeout 1:");
  console.log(req.timedout);
  if (!req.timedout) next();
}
function savePost(post, cb) {
  setTimeout(function () {
    console.log("haltOnTimeout 3:");
    cb(null, (Math.random() * 40000) >>> 0);
  }, (Math.random() * 7000) >>> 0);
}
function excuteTimeout(req, res, next) {
  setTimeout(function () {
    console.log("haltOnTimeout 3:");
    console.log(req.timedout);
    if (req.timedout) return;
    next();
    //res.send(("saved as id " + Math.random() * 40000) >>> 0);
  }, (Math.random() * 7000) >>> 0);
}
////////////////////////////////////////////

// ip 가져오기
const requestIp = require("request-ip");
// 동일ip 접속량 제한
const expressRateLimit = require("express-rate-limit");
const rateLimit = expressRateLimit({
  windowMs: 1 * 10 * 1000,
  max: 10,
  delayMs: 1 * 1000,
  handler(req, res) {
    //let ip = requestIp.getClientIp(req);
    let ip = req.ip;
    console.log("ip: " + ip);
    //console.log("statusCode: " + res.statusCode);
    res.status(this.statusCode).json({
      code: this.statusCode,
      //message: "10초 10번 1초씩 요청가능",
      message:
        ip +
        ": 해당 아이피로 짧은시간동안 너무 많은 요청이 들어옵니다. 그래서 해당아이피로 접근을 1분간 차단합니다. 1분 후 새로고침(F5) 해주세요",
      //Too many requests, please try again later.
    });
  },
});

/////////////////////////////////////////////

//*기본주소
router.get("/", (req, res) => {
  //console.log("req.session : ");
  //console.log(req.session);
  res.redirect("/login/loginHome");
});

//*라우터 설정
router.use("/customer", customerRoute); //customer 라우트를 추가하고 기본경로로 /customer 사용
router.use("/product", productRoute); //product 라우트를 추가하고 기본경로로 /product 사용
router.use("/login", rateLimit, cors(), loginRoute); //login 라우트를 추가하고 기본경로로 /login 사용
router.use("/board", cors(), Auth, compression(compressionOpt), boardRoute); //board 라우트를 추가하고 기본경로로 /board 사용
router.use("/daily", cors(), Auth, dailyRoute); //daily 라우트를 추가하고 기본경로로 /daily 사용
router.use("/function", cors(), functionRoute); //function 라우트를 추가하고 기본경로로 /function 사용
router.use("/test", cors(), testRoute); //test 라우트를 추가하고 기본경로로 /test 사용

//*라우터 공통 에러처리
router.use((err, req, res, next) => {
  /* if (req.file) {
     fs.unlink(req.file.path, (err) => {
       console.log(err);
     });
   } 
  if (res.headerSent) {
    return next(err);
  }
  */
  console.log(req.url);
  //console.log(req.originalUrl);
  //console.log(req.method);
  console.log(err.code);
  console.log(err);

  let redirectPage = "/error/500";
  if (err.code == 400) {
    redirectPage = "errorPage/400";
  } else if (err.code == 500) {
    redirectPage = "/error/500";
  } else {
    redirectPage = "/error/500";
  }

  //res.redirect(redirectPage);
  //res.status(err.code || 500).render(rendPage);
  res.json({
    statusCode: err.code,
    //statusCode: res.statusCode,
    message: err.message || "An unknown error occurred!",
  });
});

// *기본경로나 /사용 경로  가 아닌 잘못된 진입에 404 오류발생
router.use((req, res, next) => {
  //const error = new HttpError("경로를 찾을 수 없습니다.", 404);

  res.status(404).render("errorPage/404");
  /** 
  res
    .status(404)
    .send(
      "<div style='text-align:center'><p>Not Found 404.</p>  <a href='/'>go back to mainPage. </a><div>"
    );
  */
});

/*
//no-cache 설정
router.use((req, res, next) => {
  //post 일때만 적용된다.
  res.header("Cache-Control", "private,no-cache,no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
});
*/

module.exports = router;
