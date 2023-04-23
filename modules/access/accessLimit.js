// ip 가져오기
const requestIp = require("request-ip");
// 동일ip 접속량 제한
const expressRateLimit = require("express-rate-limit");
const rateLimit = expressRateLimit({
  windowMs: 1 * 20 * 1000,
  max: 20,
  delayMs: 1 * 1000,
  handler(req, res) {
    let ip = requestIp.getClientIp(req);
    //let ip = req.ip;
    console.log("ip: " + ip);
    //console.log("statusCode: " + res.statusCode);
    res.status(this.statusCode).json({
      code: this.statusCode,
      //message: "20초 20번 1초씩 요청가능",
      message:
        ip +
        ": 해당 아이피로 짧은시간동안 너무 많은 요청이 들어옵니다. 그래서 해당아이피로 접근을 1분간 차단합니다. 1분 후 새로고침(F5) 해주세요",
      //Too many requests, please try again later.
    });
  },
});

module.exports = { rateLimit };
