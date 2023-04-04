const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");
require("dotenv").config({ path: "mysql/local/.env" });
const mysql = require("./mysql/index.js");
const express = require("express");
const app = express();

app.use(express.static("xlsx"));

app.use(
  express.json({
    limit: "50mb", //
  })
);

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); //cb 콜백 함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }); //multer 객체 생성

app.post("/upload/customers", upload.single("xlsx"), function (req, res, next) {
  const workbook = xlsx.readFile("./uploads/" + req.file.filename);
  const firstSheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[firstSheetName];
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);
  console.log(firstSheetJson);
  firstSheetJson.forEach(async (customer) => {
    await mysql.query("customerInsert", customer);
  });
  res.send("ok");
});

app.get("/", (req, res) => {
  const workbook = xlsx.utils.book_new(); //가상의 엑셀파일 생성

  const customers = [
    { A: "고객명", B: "이메일", C: "연락처" },
    { A: "유재석", B: "ryu@gmail.com", C: "010-0000-2222" },
    { A: "김종국", B: "kim@gmail.com", C: "010-0000-3333" },
    { A: "지석진", B: "ji@gmail.com", C: "010-0000-4444" },
    { A: "하하", B: "ha@gmail.com", C: "010-0000-5555" },
  ];

  const firstSheet = xlsx.utils.json_to_sheet(customers, {
    header: ["A", "B", "C"],
    skipHeader: true,
  }); //skipHeader가 false이면 엑셀 시트의 첫 번쨰 행에 header에 해당하는 A,B,C 가 삽입됨.

  //컬럼(열) 넓이 지정
  firstSheet["!cols"] = [
    { wpx: 50 }, //A열
    { wpx: 120 }, //B열
    { wpx: 120 }, //C열
  ];

  //첫 번째 시트에 작성한 데이터를 넣는다.
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers");

  //엑셀 파일을 생성하고 저장한다.
  xlsx.writeFile(workbook, "./xlsx/customers.xlsx");

  res.send("ok!");
});

app.get("/download", (req, res) => {
  const downloadDBtoExcel = async () => {
    const workbook = xlsx.utils.book_new();
    const customers = await mysql.query("customerList");

    const firstSheet = xlsx.utils.json_to_sheet(customers, {
      header: ["id", "name", "email", "phone", "address"],
    });
    firstSheet["!cols"] = [
      { wpx: 50 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
    ];

    //첫번째 시트에 작성한 데이터를 넣는다.
    xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers");

    xlsx.writeFile(workbook, "./xlsx/customersFromDB.xlsx");
  };

  downloadDBtoExcel();
  res.send("downloadDBtoExcel!");
});

app.get("/download/customers", async (req, res) => {
  const workbook = xlsx.utils.book_new();
  const customers = await mysql.query("customerList");

  const firstSheet = xlsx.utils.json_to_sheet(customers, {
    header: ["id", "name", "email", "phone", "address"],
  });
  firstSheet["!cols"] = [
    { wpx: 50 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
  ];

  //첫번째 시트에 작성한 데이터를 넣는다.
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers");

  res.setHeader("Content-disposition", "attachment; filename=Customer.xlsx"); //다운로드 파일명 설정
  res.setHeader(
    "Content-type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ); //엑셀 파일 minetype 설정
  res.end(Buffer.from(xlsx.write(workbook, { type: "base64" }), "base64"));
  //res.redirect("/")
});
