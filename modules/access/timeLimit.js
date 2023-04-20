const timeout = require("connect-timeout"); //지연 응답 처리

const haltOnTimeout = (req, res, next) => {
  console.log("haltOnTimeout 1:");
  console.log(req.timedout);
  if (!req.timedout) next();
};

const savePost = (post, cb) => {
  setTimeout(function () {
    console.log("haltOnTimeout 2:");
    cb(null, (Math.random() * 40000) >>> 0);
  }, (Math.random() * 7000) >>> 0);
};

const excuteTimeout = (req, res, next) => {
  setTimeout(function () {
    console.log("haltOnTimeout 3:");
    console.log(req.timedout);
    if (req.timedout) return;
    next();
    //res.send(("saved as id " + Math.random() * 40000) >>> 0);
  }, (Math.random() * 7000) >>> 0);
};

module.exports = {
  timeout,
  haltOnTimeout,
  savePost,
  excuteTimeout,
};
