const express = require("express");
const app = express(); //클라이언트에서 HTTP요청 메소드 GET 방식으로 'host:port'를 호출했을 때
const port = 3002;

const path = require("path");

//라우트
const customerRoute = require("./routes/customer");
app.use("/customer", customerRoute);

app.use("/config", express.static("config")); //정적 파일 읽기

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(port, () => {
  console.log("Server started. port 3002");
});

//암호 모듈
const moduleSaltCrypto = require("./modules/module_saltCrypto");
//salt 암호화
let passwordStr = "pw1234";
(async () => {
  //암호화
  let createdCryptoPieces = await moduleSaltCrypto.createCryptoPassword(
    passwordStr
  );
  console.log("암호화");
  console.log(createdCryptoPieces.password);
  console.log(createdCryptoPieces.salt);

  //복호화
  let gotCryptoPieces = await moduleSaltCrypto.getCrytoPassword(
    passwordStr, //기입된 암호
    createdCryptoPieces.salt //디비에서 가져온 솔트
  );
  console.log("복호화");
  console.log(gotCryptoPieces.password);
  console.log(gotCryptoPieces.salt);

  /*
  let setCryptoPieces = async (passwordStr) => {
    //crypto.createCode(passwordStr);
    return await crypto.createCode(passwordStr);
  };
  */
  //console.log(setCryptoPieces(passwordStr));
})();

//const path = require("path");

//console.log(__dirname);

//console.log(__filename);

//console.log(path.basename(__filename));

//console.log(path.delimiter);

//const pathstr = process.env.path;

//console.log(pathstr.split(path.delimiter));

//파일 함수
const moduleFs = require("./modules/module_fs");

let filePath = "./modules/text.txt";

/*비동기*/
(async () => {
  let moduleFileResult = await moduleFs.readFile(filePath);
  console.log(moduleFileResult);
})();

/*동기*/
(async () => {
  let moduleFileSyncResult = await moduleFs.readFileSync(filePath);
  console.log(moduleFileSyncResult);
})();

/*비동기 글쓰기*/
let data = "파일 데이터 쓰기1";
let filePath2 = "./modules/text_w.txt";

/**
(async () => {
  let moduleWriteFileResult = await moduleFs.writeFile(filePath2, data);
  //console.log(moduleWriteFileResult);
})();
 */

/*동기 글쓰기*/
(async () => {
  let moduleWriteFileResult = await moduleFs.writeFileSync(filePath2, data);
  //console.log(moduleWriteFileResult);
})();

//

//

//

/**
//파일변경 감시하는 함수
let sqlPath = "./mysql/sql.js";
let updateSql = __dirname + "/sql.js";
let sql = require(updateSql); //데이터 베이스 쿼리문이 작성되어 있는 파일
const fs = require("fs");
fs.watchFile(updateSql, (curr, prev) => {
  //콜백 리스너 함수 실행
  console.log("파일 변경 시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve(updateSql)]; //캐시에 저장되어 있는 파일삭제
  sql = require(updateSql); //sql.js 파일에 변경이 일어날때 마다  sql.js 재할당
});
 */

/*파일변경 감시하는 함수*/
let sqlPath = "./mysql/sqlbox/sql.js";
let updateSql = path.join(__dirname, "/mysql/sqlbox/sql.js");
let sql = require(updateSql); //데이터 베이스 쿼리문이 작성되어 있는 파일
(async () => {
  let moduleWatchFileResult = await moduleFs.watchFile(updateSql, sql);
  //console.log(moduleWatchFileResult);
  //console.log("ss");
})();
