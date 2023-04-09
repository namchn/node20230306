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
exports.server = server;

//*소켓통신 사용
//const webSocket = require("./modules/webSocket/socket.js");
//webSocket(server);
const moduleWebSocket = require("./modules/webSocket/webSocket.js");
moduleWebSocket.serverConnection(server);

//* 서버실행시 자동실행 함수 모음
const moduleScheduleMailing = require("./modules/util/scheduleMailing");
(async () => {
  const exResult = await moduleScheduleMailing.exmailFc(
    "0,30 * * * *",
    "30분 마다 메일을 보냅니다."
  );
  console.log(exResult);
})();

//* OS
const os = require("os");
let [x1, x2, x3, x4] = os.cpus();
let cpus = os.cpus();
console.log(x1.model + " - 쓰레드 갯수 : " + cpus.length);
//console.log(cpus);
