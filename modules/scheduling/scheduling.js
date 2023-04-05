const cron = require("node-cron");

//스케쥴 반복
const scheduling1 = async (schedulingtimes, action) => {
  cron.schedule(schedulingtimes, () => {
    console.log(action);
  });
};

//스케쥴 반복 시간대 설정
const scheduling2 = async (schedulingtimes, action) => {
  cron.schedule(
    "0 12 * * *",
    () => {
      console.log("매일 America/Sao_Paulo 기준 오전 12시에 실행합니다.");
    },
    {
      scheduled: true,
      timezone: "America/Sao_Paulo",
    }
  );
};

//스케쥴 반복  함수 실행
const scheduling3 = async (schedulingtimes, actionFc) => {
  cron.schedule(schedulingtimes, actionFc, {
    timezone: "Asia/Seoul",
  });
};

exports.scheduling1 = scheduling1;
exports.scheduling2 = scheduling2;
exports.scheduling3 = scheduling3;
