const express = require("express");
const app = express();
const ejs = require("ejs");
const { setPort } = require("./modules/setting/setting");
const bodyParser = require("body-parser");
const sessionModule = require("./modules/session/express-session");
const router = require("./routes/index");

//*템플릿 설정
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", "./client/views");

//*세션 모듈 사용
app.use(sessionModule.session);

//*정적파일 접근 경로 설정
app.use("/xlsx", express.static("xlsx"));
app.use("/client", express.static("client"));

//*요청 body 파싱
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  express.json({
    limit: "50mb", //최대 50메가
  })
); // 클라이언트 요청 body를 json으로 파싱 처리

//*router
app.use(router);

//*설정값 가져오기
const port = setPort["value"];
const server = app.listen(port, () => {
  console.log("Server started. port " + port);
});

//소켓통신 사용
const webSocket = require("./modules/webSocket/socket.js");
webSocket(server);
