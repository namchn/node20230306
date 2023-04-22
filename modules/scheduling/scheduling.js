const cron = require("node-cron");

//스케쥴 반복
const scheduling1 = async (schedulingtimes, action) => {
  cron.schedule(schedulingtimes, () => {
    console.log(action);
  });
};

//스케쥴 반복 시간대 설정
const scheduling2 = async (schedulingtimes, action, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

//스케쥴 반복  함수 실행
const scheduling3 = async (schedulingtimes, actionFc, next) => {
  // 초 분 시 일 월  day of week
  // '0 9 * * Monday' 매주 월요일 09:00에 실행
  // '* * * January,Septmeber Sunday' 1월과 9월의 일요일에 실행

  try {
    cron.schedule(schedulingtimes, actionFc, {
      timezone: "Asia/Seoul",
      scheduled: true,
    });
  } catch (error) {
    next(error);
  }

  return true;
};

//스케쥴 반복  함수를 실행
const functionScheduling = async (schedulingtimes, actionFc, next) => {
  try {
    cron.schedule(schedulingtimes, actionFc, {
      timezone: "Asia/Seoul", //시간대
      scheduled: true, // start() 함수 사용하는지 여부
    });
  } catch (error) {
    next(error);
  }

  return true;
};

//스케쥴 반복  함수를 반환
const returnFunctionScheduling = async (schedulingtimes, actionFc, next) => {
  //표현식이 올바른지 확인
  let valid = cron.validate("59 * * * *");

  try {
    const task = cron.schedule(schedulingtimes, actionFc, {
      timezone: "Asia/Seoul", //시간대
      scheduled: false, // start() 함수 사용하는지 여부
      // stop()함수는  중지할때 사용
      // destroy() 스케줄링된 작업을 삭제함.
    });
  } catch (error) {
    next(error);
  }

  return await task;
};

exports.scheduling1 = scheduling1;
exports.scheduling2 = scheduling2;
exports.scheduling3 = scheduling3;
exports.functionScheduling = functionScheduling;
exports.returnFunctionScheduling = returnFunctionScheduling;
