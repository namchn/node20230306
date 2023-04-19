//const xlsx = require("xlsx");
const xlsx = require("xlsx-js-style");

const workbook = xlsx.readFile("./xlsx/text.xlsx");
const firstSheetName = workbook.SheetNames[0]; //엑셀파일의 첫번째 시트이름 가져오기
const firstSheet = workbook.Sheets[firstSheetName];
//console.log(firstSheet);

//xlsx-js-style 사용시
firstSheet["A1"].s = {
  font: {
    //폰트 스타일
    name: "Calibri", //폰트
    sz: 24, //폰트 사이즈
    bold: true, //폰트 볼드체 여부
    color: { rgb: "FFFFAA00" }, //폰트색상
  },
};

console.log(firstSheet["A1"].v);
console.log(firstSheet["B1"].v);
console.log(firstSheet["A2"].v);
console.log(firstSheet["B2"].v);
console.log(firstSheet["A3"].v);

const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet); //json 데이터로 변환
//console.log(firstSheetJson);

//const firstSheetHtml = xlsx.utils.sheet_to_html(firstSheet); //json 데이터로 변환
//console.log(firstSheetHtml);

//const firstSheetCsv = xlsx.utils.sheet_to_csv(firstSheet); //json 데이터로 변환
//console.log(firstSheetCsv);

//const firstSheetTxt = xlsx.utils.sheet_to_csv(firstSheet); //json 데이터로 변환
//console.log(firstSheetTxt);

firstSheet["B2"].v = "chun nam";
//firstSheet["A4"].v = "3";
firstSheet["A4"] = { t: "s", v: "3" };
firstSheet["B4"] = { t: "s", v: "bak" };
firstSheet["C4"] = { t: "s", v: "bak@naver.com" };
firstSheet["D4"] = { t: "s", v: "010-2222-2222" };

xlsx.writeFile(workbook, "./xlsx/text2.xlsx");
