const cron = require("node-cron");

cron.schedule("10,20,30,40,50 * * * * *", () => {
  console.log("10초마다 작업을 실행합니다.");
});

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
