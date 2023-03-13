const crypto = require("crypto");

crypto.createHash("sha512").update("pw1234").digest("base64");

//console.log(crypto);

const createSalt = async () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("base64"));
    });
  });
};

//const cs = createSalt();
//console.log(cs);

const createCryptoPassword = async (plainPassword) => {
  const salt = await createSalt(); //salt 생성

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      if (err) reject(err);
      //console.log(key.toString("base64"));
      //console.log("salt:" + salt);
      resolve({ password: key.toString("base64"), salt });
    });
  });
};

const createCode = async () => {
  const ff = await createCryptoPassword("pw1234");

  console.log("암호생성");
  console.log(ff);
  //console.log("salt : " + ff.salt);
  //암호화된 코드
  return ff.salt;
};
//createCode();

const getCrytoPassword = (plainPassword, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString("base64"), salt });
    });
  });
};

const getCode = async () => {
  const ff = await getCrytoPassword("pw1234", await createCode());
  //암호화된 코드
  console.log("암호해석");
  console.log(ff);
};
getCode();
