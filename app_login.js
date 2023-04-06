const express = require("express");
const app = express();

//*설정값 가져오기
const { setPort } = require("./modules/setting/setting");
const port = setPort["value"];

//*cross-origin 요청: 다른 서버의 요청을 가능하게 함
const cors = require("cors"); //Cross-Origin Resource Sharing

//*정적파일 접근 경로 설정
app.use("/xlsx", express.static("xlsx"));
app.use("/client", express.static("client"));

//*요청 body 파싱
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  express.json({
    limit: "50mb", //최대 50메가
  })
); // 클라이언트 요청 body를 json으로 파싱 처리

app.listen(port, () => {
  console.log("Server started. port " + port);
});

//*세션 모듈 사용
const sessionModule = require("./modules/session/express-session");
app.use(sessionModule.session);

//*router
const customerRoute = require("./routes/customer"); //cutomer라우트 추가
const productRoute = require("./routes/product"); //product라우트 추가
const loginRoute = require("./routes/login"); //product라우트 추가
const boardRoute = require("./routes/board"); //board라우트 추가
const dailyRoute = require("./routes/daily"); //daily라우트 추가
const functionRoute = require("./routes/function"); //function라우트 추가
const testRoute = require("./routes/test"); //test라우트 추가

//*라우터 설정

app.use("/customer", customerRoute); //customer 라우트를 추가하고 기본경로로 /customer 사용
app.use("/product", productRoute); //product 라우트를 추가하고 기본경로로 /product 사용
app.use("/test", cors(), testRoute); //test 라우트를 추가하고 기본경로로 /test 사용
app.use("/login", cors(), loginRoute); //login 라우트를 추가하고 기본경로로 /login 사용
app.use("/board", cors(), boardRoute); //board 라우트를 추가하고 기본경로로 /board 사용
app.use("/daily", cors(), dailyRoute); //daily 라우트를 추가하고 기본경로로 /daily 사용
app.use("/function", cors(), functionRoute); //function 라우트를 추가하고 기본경로로 /function 사용

//*기본주소
app.get("/", (req, res) => {
  res.redirect("/login/loginHome");
});

//*템플릿 설정
const ejs = require("ejs");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views", "./client/views");

// *기본경로나 /user말고 다른곳 진입했을경우 실행
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      "<div style='text-align:center'><p>Not Found 404.</p>  <a href='/'>go back to mainPage. </a><div>"
    );
});
