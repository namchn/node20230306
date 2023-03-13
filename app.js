//const { request } = require("express");
const express = require("express");
const app = express();
const session = require("express-session");
const fs = require("fs");
const { request } = require("http");
const port = 3000;

app.use(
  session({
    secret: "secre code",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, //쿠키 유효시간 1시간
    },
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(port, () => {
  console.log("Sever stared. port 3000");
});

let sql = require("./mysql/sql.js");

fs.watchFile(__dirname + "./mysql/sql.js", (curr, prev) => {
  console.log("sql 변경 시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./mysql/sql.js")];
  sql = require("./mysql/sql.js");
});

app.get("/", (req, res) => {
  res.send("hello world!");
});

const db = {
  //database: "dev_class",
  //connectionLimit: 10,
  //host: "192.168.219.100",
  //user: "root",
  //password: "mariadb",

  connectionLimit: 10,
  host: "127.0.0.1",
  port: "3306",
  user: "dev02",
  password: "1234",
  database: "dev_class",
};

const dbPool = require("mysql").createPool(db);

app.post("/api/login", async (request, res) => {
  try {
    await req.db("signUp", request.body.param);
    if (request.body.param.length > 0) {
      for (let key in request.body.param[0])
        request.session[key] = request.body.param[0][key];
      res.send(request.body.param[0]);
    } else {
      res.send({
        error: "Please try again or contact system manager.",
      });
    }
  } catch (err) {
    res.send({
      error: "DB acces error",
    });
  }
});

app.post("/api/logout", async (request, res) => {
  request.session.destroy();
  res.send("ok");
});

app.post("/upload/:productId/:type/:fileName", async (request, res) => {
  let { productId, type, fileName } = request.params;
  const dir = "${__dirname}/uploads/${productId}";
  const file = "${dir}/${fileName}";

  if (!request.body.data)
    return fs.unlink(file, async (err) =>
      res.send({
        err,
      })
    );
  const data = request.body.data.slice(
    request.body.data.indexOf(";base64,") + 8
  );
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFile(file, data, "base64", async (error) => {
    await req.db("productImageInsert", [
      {
        product_id: productId,
        type: type,
        path: fileName,
      },
    ]);
    if (error) {
      res.send({
        error,
      });
    } else {
      res.send("ok");
    }
  });
});

app.get("/download/:productId/:fileName", (request, res) => {
  const { productId, type, fileName } = request.params;
  const filepath = "${__dirname}/uploads/${productId}/${fileName}";
  res.header(
    "Content-Type",
    'image/${fileName.substring(fileName.lastIndexOf("."))}'
  );
  if (!fs.existsSync(filepath))
    res.send(404, {
      error: "Can not found file.",
    });
  else fs.createReadStream(filepath).pipe(res);
});

app.post("/apirole/:alias", async (request, res) => {
  if (!request.session.email) {
    return res.status(401).send({
      error: "You need to login.",
    });
  }

  try {
    res.send(await req.db(request.params.alias));
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

//??
app.post("/api/:alias", async (request, res) => {
  try {
    res.send(
      await req.db(request.params.alias, request.body.param, request.body.where)
    );
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

const req = {
  async db(alias, param = [], where = "") {
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != "ER_DUP_ENTRY") console.log(error);
          resolve({
            error,
          });
        } else resolve(rows);
      })
    );
  },
};
