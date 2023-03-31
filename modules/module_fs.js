const fs = require("fs");

//비동기 파일 읽기
const readFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    //
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      //console.log(data);
      resolve(data);
    });
    //
  });

  /*
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
  }); 
    */
};

// 파일  읽기
const readFileSync = (filePath) => {
  let result = fs.readFileSync(filePath, "utf8");
  return result;
};

//비동기 파일 쓰기
const writeFile = async (filePath, data) => {
  fs.writeFile(filePath, data, "utf-8", (err) => {
    if (err) {
      throw err;
    }
    //비동기 파일 쓰기
  });
};

//동기 파일 쓰기
const writeFileSync = async (filePath, data) => {
  fs.writeFileSync(filePath, data, "utf-8", (err) => {
    if (err) {
      throw err;
    }
    //동기 파일 쓰기
  });
};

//파일변경 감시하는 함수
//let sqlPath = "./mysql/sql.js";
//let updateSql = __dirname + "/sql.js";
//let sql = require(updateSql); //데이터 베이스 쿼리문이 작성되어 있는 파일

const watchFile = async (updateFilePath, sql) => {
  return new Promise((resolve, reject) => {
    //
    fs.watchFile(updateFilePath, (curr, prev) => {
      //콜백 리스너 함수 실행
      console.log("파일 변경 시 재시작 없이 반영되도록 함.");
      delete require.cache[require.resolve(updateFilePath)]; //캐시에 저장되어 있는 파일삭제
      sql = require(updateFilePath); //변경 파일 재할당
      //console.log(sql);
      resolve(sql);
    });
    //
  });
};

module.exports = {
  readFile, //비동기 파일 읽기 함수
  readFileSync, //동기 파일 읽기 함수
  writeFile, //비동기 파일 쓰기 함수
  writeFileSync, //동기 파일 쓰기 함수
  watchFile, //파일변경 감시하는 함수
};
