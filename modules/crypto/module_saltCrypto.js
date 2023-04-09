const crypto = require("crypto");

//setting 값 가져오기
const path = require("path");
const moduleFs = require("../fs/fs");
const systemPath = path.join(__dirname, "/../../_set/system_setting.json");
const json = JSON.parse(moduleFs.readFileSync(systemPath)); //JSON.stringify(result);
const rnum = Number(json.setting2.saltCrypto.repeatNumber.value);

//crypto.createHash("sha512").update("pw1234").digest("base64");
//console.log(crypto);

//salt 생성
const createSalt = async () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("base64"));
    });
  });
};

//암호화
const createCryptoPassword = async (plainPassword) => {
  const salt = await createSalt(); //salt 생성

  return await new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, rnum, 64, "sha512", (err, key) => {
      if (err) reject(err);
      //console.log(key.toString("base64"));
      resolve({ password: key.toString("base64"), salt });
    });
  });
};

//암호화
const createCode = async (passwordStr) => {
  const createdCryptoPieces = await createCryptoPassword(passwordStr);

  //console.log("암호생성");
  //console.log(setCryptoPieces);
  //암호화된 코드
  return await createdCryptoPieces;
};

//복호화
const getCrytoPassword = async (plainPassword, salt) => {
  return await new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, rnum, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString("base64"), salt });
    });
  });
};

//복호화
const getCode = async (plainPassword, salt) => {
  const gotCryptoPieces = await getCrytoPassword(plainPassword, salt);
  //암호화된 코드
  //console.log("암호해석");
  return await gotCryptoPieces;
};

module.exports = {
  createCode, //암호화 함수
  createCryptoPassword, //암호화 함수
  getCode, //복호화 함수
  getCrytoPassword, //복호화 함수
};
