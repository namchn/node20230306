const express = require("express");
const app = express();
const ejs = require("ejs"); //뷰 템플릿
const { setPort } = require("./modules/setting/setting");
const router = require("./routes/index");
const moduleAuto = require("./modules/auto/index");

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

//* 서버실행시 자동실행 함수 모음
moduleAuto.autoListExcuting();

//*소켓통신 사용
//const webSocket = require("./modules/webSocket/socket.js");
//webSocket(server);
const moduleWebSocket = require("./modules/webSocket/webSocket.js");
moduleWebSocket.serverConnection(server);
