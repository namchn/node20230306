const fs = require("fs");
const path = require("path"); //경로 모듈

let fsPath = path.join(__dirname, "/../../modules/fs/fs");
//파일 모듈
const moduleFs = require(fsPath);

// 시간 모먼트js
const moment = require("moment");
require("moment-timezone");
//현재시간
moment.tz.setDefault("Asia/Seoul");

//비동기 요청 코드
const https = require("https");

const t1 = async (options, i) => {
  let today = moment().format("YYYYDDMM_HH_mm_ss");
  let htmlPath = path.join(
    __dirname,
    "/../../client/etc/html/sample" + today + i + ".html"
  );

  // HTTP 요청 보내기
  const request = https.request(options, async (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", async () => {
      //let before = moment().valueOf();
      //

      await moduleFs.writeFileSync(htmlPath, data);
      let after = moment().valueOf();
      //
      //console.log("시간차이 (밀리세컨드):");
      //console.log(after - before);

      //res.send(data);
      //res.send("html 파일을 만들었어요");
      //res.sendFile(filePath);
    });
  });

  request.on("error", (error) => {
    console.error(error);
  });

  request.end();

  return await htmlPath;
};

exports.t1 = t1; //파일변경 감시하는 함수
