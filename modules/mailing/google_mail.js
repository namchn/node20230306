require("dotenv").config({ path: "nodemailer/.env" }); //환경변수 설정
const path = require("path");
const nodemailerPath = path.join(__dirname, "/../../nodemailer/index.js");
const nodemailer = require(nodemailerPath);

// 시간 모먼트js
const moment = require("moment");
require("moment-timezone");
//현재시간
moment.tz.setDefault("Asia/Seoul");

const googleMail = async (param) => {
  let today = moment().format();
  console.log("메일 발송시각:" + today);
  return await nodemailer.send(param);
};

exports.googleMail = googleMail;
