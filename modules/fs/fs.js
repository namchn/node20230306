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

exports.watchFileSql = watchFileSql;
exports.watchFile = watchFile;
