const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");

const xlsxStored = async (
  fileDirectory,
  xlsxFileName,
  firstSheetName,
  storeDirectory,
  xlsxData,
  xlsxHeader,
  skipHeader,
  colsWidth
) => {
  /** 예시 
    const fileDirectory = "../uploads";
    const xlsxFileName = "customers.xlsx";
    const firstSheetName = "Customers";
    const storeDirectory = "./client/xlsx";

    const xlsxData = [
        { A: "고객명", B: "이메일", C: "연락처" },
        { A: "유재석", B: "ryu@gmail.com", C: "010-0000-1111" },
        { A: "김종국", B: "kim@gmail.com", C: "010-0000-2222" },
        { A: "지석진", B: "ji@gmail.com", C: "010-0000-3333" },
        { A: "하하", B: "ha@gmail.com", C: "010-0000-4444" },
    ];

    const xlsxHeader = ["A", "B", "C"];
    const colsWidth = [50, 120, 120];
    const skipHeader = true; 
   */

  const workbook = xlsx.utils.book_new(); //가상의 엑셀파일 생성

  const firstSheet = xlsx.utils.json_to_sheet(xlsxData, {
    header: xlsxHeader,
    skipHeader: skipHeader,
  }); //skipHeader가 false이면 엑셀 시트의 첫 번쨰 행에 header에 해당하는 A,B,C 가 삽입됨.

  //컬럼(열) 넓이 지정
  let colsWidthList = [];
  for (var i = 0; i < colsWidth.length; i++) {
    let col = { wpx: colsWidth[i] };
    colsWidthList.push(col);
  }
  firstSheet["!cols"] = colsWidthList;

  /**
   firstSheet["!cols"] = [
    { wpx: 50 }, //A열
    { wpx: 120 }, //B열
    { wpx: 120 }, //C열
  ]; 
   */

  //첫 번째 시트에 작성한 데이터를 넣는다.
  xlsx.utils.book_append_sheet(workbook, firstSheet, firstSheetName);

  //엑셀 파일을 생성하고 저장한다.
  xlsx.writeFile(workbook, storeDirectory + "/" + xlsxFileName);

  return await true;
};

//엑셀 업로드 설정
const uploadSingle = (uploadDirectory) => {
  //const uploadDirectory = "./uploads";

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory); //cb 콜백 함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storage }); //multer 객체 생성

  return upload.single("xlsx");
};

//디비 업로드 insert
const xlsxToDB = async (req, res, uploadDirectory, DbUsePath, queryId) => {
  //uploadDirectory = "/../uploads";
  //DbPath = "/../../mysql/index.js";
  //queryId = "customerInsert";
  //디비 설정
  const mysql = require(DbUsePath);

  if (req.file.filename) {
    const workbook = xlsx.readFile(uploadDirectory + "/" + req.file.filename);
    const firstSheetName = workbook.SheetNames[0];
    const firstSheet = workbook.Sheets[firstSheetName];
    const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);
    console.log(firstSheetJson);

    firstSheetJson.forEach(async (list) => {
      let result = await mysql.query(queryId, list);
      console.log("result : ");
      console.log(result);
    });
    return await true;
  }
};

//엑셀 다운로드
const xlsxDownload = async (
  req,
  res,
  DbUsePath,
  queryId,
  header,
  colsWidth,
  firstSheetName,
  xlsxFileName,
  downloadDiretory
) => {
  // const uploadDirectory = path.join(__dirname, "/../uploads");
  // const DbUsePath = path.join(__dirname, "/../mysql/index.js");
  // const queryId = "customerList";
  // const header: =  ["id", "name", "email", "phone", "address"];
  //const colsWidth =   [{ wpx: 50 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }];
  //const firstSheetName = "Customers";
  //const downloadDiretory = "./xlsx";
  //const xlsxFileName = "customersFromDB3.xlsx";

  //디비 설정
  const mysql = require(DbUsePath);

  const downloadDBtoExcel = async () => {
    const workbook = xlsx.utils.book_new();
    const list = await mysql.query(queryId);

    const firstSheet = xlsx.utils.json_to_sheet(list, {
      header: header,
    });
    firstSheet["!cols"] = colsWidth;

    //첫번째 시트에 작성한 데이터를 넣는다.
    xlsx.utils.book_append_sheet(workbook, firstSheet, firstSheetName);

    xlsx.writeFile(workbook, downloadDiretory + "/" + xlsxFileName);
  };

  downloadDBtoExcel();
  return true;
};

const xlsxFileDownload = async (
  req,
  res,
  DbUsePath,
  queryId,
  header,
  colsWidth,
  firstSheetName,
  xlsxFileName,
  downloadDiretory
) => {
  // const uploadDirectory = path.join(__dirname, "/../uploads");
  // const DbUsePath = path.join(__dirname, "/../mysql/index.js");
  // const queryId = "customerList";
  // const header: =  ["id", "name", "email", "phone", "address"];
  //const colsWidth =   [{ wpx: 50 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }];
  //const firstSheetName = "Customers";
  //const downloadDiretory = "./xlsx";
  //const xlsxFileName = "customersFromDB3.xlsx";

  //디비 설정
  const mysql = require(DbUsePath);

  const workbook = xlsx.utils.book_new();
  const list = await mysql.query(queryId);

  const firstSheet = xlsx.utils.json_to_sheet(list, {
    header: header,
  });
  firstSheet["!cols"] = colsWidth;

  //첫번째 시트에 작성한 데이터를 넣는다.
  xlsx.utils.book_append_sheet(workbook, firstSheet, firstSheetName);

  return xlsx.write(workbook, { type: "base64" });
};

const xlsxFileDownloadBuffer = async (
  DbUsePath,
  queryId,
  header,
  colsWidth,
  firstSheetName,
  xlsxFileName,
  downloadDiretory
) => {
  // const uploadDirectory = path.join(__dirname, "/../uploads");
  // const DbUsePath = path.join(__dirname, "/../mysql/index.js");
  // const queryId = "customerList";
  // const header: =  ["id", "name", "email", "phone", "address"];
  //const colsWidth =   [{ wpx: 50 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }];
  //const firstSheetName = "Customers";
  //const downloadDiretory = "./xlsx";
  //const xlsxFileName = "customersFromDB3.xlsx";

  //디비 설정
  const mysql = require(DbUsePath);

  const workbook = xlsx.utils.book_new();
  const list = await mysql.query(queryId);

  const firstSheet = xlsx.utils.json_to_sheet(list, {
    header: header,
  });
  firstSheet["!cols"] = colsWidth;

  //첫번째 시트에 작성한 데이터를 넣는다.
  xlsx.utils.book_append_sheet(workbook, firstSheet, firstSheetName);

  return xlsx.write(workbook, { type: "buffer" }); //첨부파일 내용 생성
};

module.exports = {
  xlsxStored,

  uploadSingle,
  xlsxToDB,
  xlsxDownload,
  xlsxFileDownload,
  xlsxFileDownloadBuffer,
};

//exports.xlsxStored = xlsxStored;

//exports.uploadSingle = uploadSingle;
//exports.xlsxToDB = xlsxToDB;
//exports.xlsxDownload = xlsxDownload;
//exports.xlsxFileDownload = xlsxFileDownload;
