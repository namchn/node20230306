const express = require("express");
const app = express();
const ejs = require("ejs"); //뷰 템플릿
const { setPort } = require("./modules/setting/setting");
const router = require("./routes/index");

//*템플릿 설정
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", "./client/views");

//X-Powered-By 막기
app.disable("x-powered-by");

//*router
app.use(router);

//*설정값 가져오기
const port = setPort["value"];
const server = app.listen(port, "0.0.0.0", () => {
  //"0.0.0.0" => ip를  IPv6 에서 IPv4로 설정
  console.log("Server started. port " + port);
});
exports.server = server;

//*소켓통신 사용
//const webSocket = require("./modules/webSocket/socket.js");
//webSocket(server);
const moduleWebSocket = require("./modules/webSocket/webSocket.js");
moduleWebSocket.serverConnection(server);

//* 서버실행시 자동실행 함수 모음
/**  */
const moduleScheduleMailing = require("./modules/util/scheduleMailing");
(async () => {
  const exResult = await moduleScheduleMailing.exmailFc(
    "0 12 * * *", //초 분 시 일 월 년
    "매일 12시 마다 메일을 보냅니다."
  );
  console.log(exResult);
})();

//* OS
const os = require("os");
let [x1, x2, x3, x4] = os.cpus();
let cpus = os.cpus();
console.log(x1.model + " - 쓰레드 갯수 : " + cpus.length);
//console.log(cpus);
