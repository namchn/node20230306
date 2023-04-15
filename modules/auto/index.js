/** 자동 실행 함수들 */
const moduleScheduleMailing = require("../util/scheduleMailing");

const autoListExcuting = async () => {
  //자동 실행 목록
  let autolist = [];

  //1.서버cpu사항
  autolist.push("os.cpus");
  //* OS
  const os = require("os");
  let [x1, x2, x3, x4] = os.cpus();
  let cpus = os.cpus();
  console.log(x1.model + " - 쓰레드 갯수 : " + cpus.length);
  //console.log(cpus);

  //2.메일링
  autolist.push("moduleScheduleMailing.exmailFc");
  const ex2 = await moduleScheduleMailing.exmailFc(
    "0 12 * * *", //초 분 시 일 월 년
    "매일 12시 마다 메일을 보냅니다."
    //"0-59 * * * *", //초 분 시 일 월 년
    //"매분 마다 메일을 보냅니다."
  );

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
