const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
};

/*
const transporter = nodemailer.createTransport({
    host: "smtp.exmple.com", //smtp 서버 호스트 주소
    port: 587, //포트 번호
    secure: false, //true 이면, smtp 서버 접속시 tls를 사용. true인 경우 일반적으로 포트 번호는 465를 사용, false인 경우는 포트 번호 587 혹은 25 사용
    auth: {
      user: "username",
      pass: "password", //
    },
  });
 */

const send = async (data) => {
  const transporter = nodemailer.createTransport(config);

  //smtp 서버 접속 정보가 정상적인지 확인
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("서버가 메시지를 받을 준비가 되어 있습니다.");
    }
  });

  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
};

module.exports = {
  send,
};
