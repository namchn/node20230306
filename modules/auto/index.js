require("dotenv").config({ path: "_set/.env" }); //설정값

/** 자동 실행 함수들 */
const moduleScheduleMailing = require("../util/scheduleMailing");

const autoListExcuting = async (next) => {
  //자동 실행 목록
  let autolist = [];

  try {
    //1.서버cpu사항
    autolist.push("os.cpus");
    //* OS
    const os = require("os");
    let [x1, x2, x3, x4] = os.cpus();
    let cpus = os.cpus();
    console.log(x1.model + " - 쓰레드 갯수 : " + cpus.length);
    //console.log(cpus);

    //2.엑셀 메일링
    autolist.push("moduleScheduleMailing.exmailFc");
    const ex2 = await moduleScheduleMailing.exmailFc(
      "0 0,6,12,18 * * *", //초 분 시 일 월 week
      "매일 0,6,12,18시 마다 메일을 보냅니다."
      //"0-59 * * * *",
      //"매분 마다 메일을 보냅니다."
    );

    //3.파일 메일링
    autolist.push("moduleScheduleMailing.logfileExmailFc");
    const moduleFs = require("../fs/fs");
    const path = require("path");
    //const logPath = path.join(__dirname, "/../../_log/access.log");
    const logPath = path.join(__dirname, "/../../_log/error.log");
    const log = moduleFs.readFileSync(logPath, "utf8"); //JSON.stringify(result);
    //console.log(log);
    const ex3 = await moduleScheduleMailing.logfileExmailFc(
      "0 0-23/4 * * *", //초 분 시 일 월 week
      "매일 4시간 마다 메일을 보냅니다.",
      log
      //"0-59 * * * *",
      //"매분 마다 메일을 보냅니다."
    );

    //4.재기동 메일링
    if (process.env.OPERATION == "true") {
      autolist.push("moduleScheduleMailing.startExmailFc");
      const ex4 = await moduleScheduleMailing.startExmailFc(
        "ncware@gmail.com",
        "chunwoo84@hanmail.net",
        "재기동 알림 메일 보내기 자동실행"
      );
    }
  } catch (error) {
    next(error);
  }

  return consoleFc(autolist);
};

//자동 실행 반환 함수
const consoleFc = (list) => {
  console.log("=====자동실행 목록=====");
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    console.log(element);
  }
};

module.exports = {
  autoListExcuting,
};
