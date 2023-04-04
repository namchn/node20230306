const express = require("express");
require("dotenv").config({ path: "nodemailer/.env" }); //환경변수 설정
const nodemailer = require("./nodemailer/index.js");
const app = express();

app.use(
  express.json({
    limit: "50mb", //최대 50메가
  })
); // 클라이언트 요청 body를 json으로 파싱 처리

app.listen(3002, () => {
  console.log("Server started. port 3002");
});

app.get("/", (req, res) => {
  res.send("hi mama"); //결과를 클라이언트로 보냄
});

//localhost:3000/api/email 라우트로 이메일 데이터를 post를 전송하면 nodemailer의 send() 함수를 실행
app.post("/api/email", async (req, res) => {
  const r = await nodemailer.send(req.body.param);
  res.send(r); //결과를 클라이언트로 보냄
});
