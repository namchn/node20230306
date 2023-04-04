require("dotenv").config({ path: "nodemailer/.env" }); //환경변수 설정
const path = require("path");
const nodemailerPath = path.join(__dirname, "/../../nodemailer/index.js");
const nodemailer = require(nodemailerPath);

const googleMail = async (param) => {
  return await nodemailer.send(param);
};

exports.googleMail = googleMail;
