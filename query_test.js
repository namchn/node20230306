let sql = require("./mysql/sqlbox/sql.js");

const db = {
  //database: "dev_class",
  //connectionLimit: 10,
  //host: "192.168.219.100",
  //user: "root",
  //password: "mariadb",

  //connectionLimit: 10,
  //host: "127.0.0.1",
  //port: "3306",
  //user: "dev02",
  //password: "1234",
  //database: "dev_class",

  connectionLimit: 10,
  host: "127.0.0.1",
  port: "3306",
  user: "dev01",
  password: "1234",
  database: "node",
};
const dbPool = require("mysql").createPool(db);

//쿼리 테스트
const query = async (alias, values) => {
  return new Promise((resolve, reject) =>
    dbPool.query(sql[alias].query, values, (error, results) => {
      if (error) {
        console.log(error);
        reject({
          error,
        });
      } else resolve(results);
    })
  );
};

module.exports = {
  query,
};
