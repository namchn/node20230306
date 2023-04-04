const mysql = require("mysql");
const fs = require("fs"); //파일시스템
const path = require("path"); //경로 모듈
//const moduleFs = require("../modules/fs/fs");

//const sql = require("./sql.js"); //sql 쿼리문이 작성된문
let updateFilePath = path.join(__dirname + "/sqlbox/sql.js");
let sql = require(updateFilePath);

//sql.js 를 재기동 없이 사용할 수 있도록 함(운영시)
fs.watchFile(updateFilePath, (curr, prev) => {
  //콜백 리스너 함수 실행
  console.log(
    "파일 변경 시 " + updateFilePath + " 이 재시작 없이 반영되도록 함."
  );
  delete require.cache[require.resolve(updateFilePath)]; //캐시에 저장되어 있는 파일삭제
  sql = require(updateFilePath); //변경 파일 재할당
});

/**  */
const pool = mysql.createPool({
  //connectionLimit: 10,
  //host: "127.0.0.1",
  //user: "dev01",
  //password: "1234",
  //database: "node",

  connectionLimit: process.env.MYSQL_LIMIT,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

/* 쿼리문을 실행하고 결과를 반환하는 함수 */
const query = async (alias, values) => {
  return new Promise((resolve, reject) =>
    pool.query(sql[alias].query, values, (error, results) => {
      if (error) {
        console.log(error);
        reject({
          error,
        });
      } else resolve(results);
    })
  );
};

module.exports = {
  query,
};
