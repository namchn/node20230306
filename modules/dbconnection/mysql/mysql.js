const path = require("path"); //경로 모듈

//mysql 모듈
const query = async (queryStr, params) => {
  const mysqlPath = path.join(__dirname, "/../../../mysql/index.js");
  const mysql = require(mysqlPath);

  return await mysql.query(queryStr, params);
};

exports.query = query;
