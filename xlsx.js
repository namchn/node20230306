const xlsx = require("xlsx");

const workbook = xlsx.readFile("./xlsx/text.xlsx");
const firstSheetName = workbook.SheetNames[0]; //엑셀파일의 첫번째 시트이름 가져오기
const firstSheet = workbook.Sheets[firstSheetName];
//console.log(firstSheet);

console.log(firstSheet["B2"].v);
console.log(firstSheet["A3"].v);

const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet); //json 데이터로 변환

//console.log(firstSheetJson);

firstSheet["B2"].v = "chun nam";
//firstSheet["A4"].v = "3";
firstSheet["A4"] = { t: "s", v: "3" };
firstSheet["B4"] = { t: "s", v: "bak" };
firstSheet["C4"] = { t: "s", v: "bak@naver.com" };
firstSheet["D4"] = { t: "s", v: "010-2222-2222" };

xlsx.writeFile(workbook, "./xlsx/text2.xlsx");
