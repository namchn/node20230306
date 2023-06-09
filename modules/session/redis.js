require("dotenv").config({ path: "_set/.env" }); //설정값
const redis = require("redis"); //레디스

//* 레디스  연결
// redis[s]://[[username][:password]@][host][:port][/db-number]
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true, // 반드시 설정 !!  설정 안하면 connect-redis 동작 안함
});
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용

/* (async () => {
    let bool = await redisCli.set("key1", "123"); // OK
    let data = await redisCli.get("key1"); // 123
    console.log(data);
  })(); */
////////////

module.exports = {
  redisCli,
};
