const fs = require("fs");
const path = require("path"); //경로 모듈

const watchFile = (updateFilePath) => {
  //return new Promise((resolve, reject) => {
  //
  fs.watchFile(updateFilePath, (curr, prev) => {
    //콜백 리스너 함수 실행
    console.log(updateFilePath + " : 변경 되었는지 확인 함.");
    //console.log(prev.mtime + " : prev");
    //console.log(curr.mtime + " : curr");
  });
  //
  //});
};

const watchFileSql = async (updateFilePath, sql) => {
  return new Promise((resolve, reject) => {
    //
    fs.watchFile(updateFilePath, (curr, prev) => {
      //콜백 리스너 함수 실행
      console.log(
        "파일 변경 시 " + updateFilePath + " 이 재시작 없이 반영되도록 함."
      );
      delete require.cache[require.resolve(updateFilePath)]; //캐시에 저장되어 있는 파일삭제
      sql = require(updateFilePath); //변경 파일 재할당
      //console.log(sql);
      resolve(sql);
    });
    //
  });
};

//비동기 파일 읽기
const readFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    //
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.log(error);
        //console.error(`Error reading file: ${error}`);
        return res.status(500).send("<h1>500 error</h1>");
        //throw err;
      }
      //console.log(data);
      resolve(data);
      //res.writeHead(200, { "Content-Type": "text/html" });
      //res.end(data);
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
  try {
    let result = fs.readFileSync(filePath, "utf8");
    return result;
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return null;
  }
};

//비동기 파일 쓰기
const writeFile = async (filePath, data) => {
  fs.writeFile(filePath, data, "utf-8", (err) => {
    if (err) {
      //throw err;
      console.log(err);
    }
    //비동기 파일 쓰기
  });
};

//동기 파일 쓰기
const writeFileSync = async (filePath, data) => {
  fs.writeFileSync(filePath, data, "utf-8", (err) => {
    if (err) {
      //throw err;
      console.log(err);
    }
    //동기 파일 쓰기
  });
};

module.exports = {
  watchFile, //파일변경 감시하는 함수
  watchFileSql, //Sql파일변경 감시하는 함수

  readFile, //비동기 파일 읽기 함수
  readFileSync, //동기 파일 읽기 함수
  writeFile, //비동기 파일 쓰기 함수
  writeFileSync, //동기 파일 쓰기 함수
};

//exports.watchFile = watchFile; //파일변경 감시하는 함수
//exports.watchFileSql = watchFileSql; //Sql파일변경 감시하는 함수

//exports.readFile = readFile; //비동기 파일 읽기 함수
//exports.readFileSync = readFileSync; //동기 파일 읽기 함수
//exports.writeFile = writeFile; //비동기 파일 쓰기 함수
//exports.writeFileSync = writeFileSync; //동기 파일 쓰기 함수
