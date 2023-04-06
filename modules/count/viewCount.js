//카운트 모듈
let moduleCount = require("./count");

let urlViewCount = (url) => {
  let UVC = moduleCount.count.UrlViewCount[url];
  console.log(UVC);
  if (UVC) {
    moduleCount.count.UrlViewCount[url] += 1;
  } else {
    moduleCount.count.UrlViewCount[url] = 1;
  }

  console.log("==UrlViewCount==");
  console.log(moduleCount.count.UrlViewCount);
  //console.log(moduleCount.count);
  return moduleCount.count.UrlViewCount;
};

exports.urlViewCount = urlViewCount;
