//경로 모듈
const path = require("path");
// 시간 모먼트js
const moment = require("moment");
require("moment-timezone");
//현재시간
moment.tz.setDefault("Asia/Seoul");

//엑셀 모듈
const moduleXlsx = require("../fileStore/xlsx");
//메일 모듈
const moduleMailing = require("../mailing/google_mail");
//스케쥴 모듈
const modulescheduling = require("../scheduling/scheduling");

//엑셀파일 을 메일 스케쥴링으로 보내기 자동 실행 함수
const exmailFc = async (schedulingtimes, actionStr) => {
  //////////////////////////////////////////////////
  console.log("엑셀파일 을 메일 스케쥴링으로 보내기 자동실행");
  //엑셀 파일 첨부
  const DbUsePath = path.join(__dirname, "/../../mysql/index.js");
  const queryId = "customerList";
  const header = ["id", "name", "email", "phone", "address"];
  const colsWidth = [
    { wpx: 50 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
  ];
  const firstSheetName = "Customers";
  //const downloadDiretory = "./xlsx";
  const xlsxFileName = "customersFromDB.xlsx";

  const xlsxResult = await moduleXlsx.xlsxFileDownloadBuffer(
    DbUsePath,
    queryId,
    header,
    colsWidth,
    firstSheetName,
    xlsxFileName
  );

  //////////////////////////////////////////////////

  //const schedulingtimes = "0,5,10,15,20,25,30,35,40,45,50,55 * * * *";
  //const schedulingtimes = "0,5,10,15,20,25,30,35,40,45,50,55 * * * * *";
  let count = 0;

  const actionFc = async () => {
    let today = moment().format();
    count++;

    console.log(count + ": 메일링 함수 호출 시각:" + today);
    //내용
    let params = {
      from: "ncware@gmail.com",
      to: "chunwoo84@hanmail.net",
      subject: "파일 첨부된 정기 메일링입니다. :" + count,
      text:
        actionStr + "엑셀파일을 첨부해서 이메일을 보냅니다. 시간은 " + today,
      attachments: [
        {
          filename: today + "Customers.xlsx",
          content: Buffer.from(xlsxResult, "base64"), //첨부파일 내용 생성
        },
      ],
    };
    //const r = await moduleMailing.googleMail(params);
    //const action = "정해진 스케쥴 마다 메일을 보냅니다.";

    console.log(actionStr);
    try {
      let response = await moduleMailing.googleMail(params);
    } catch (err) {
      console.log(err);
    }
  };

  //실행함수
  const re = modulescheduling.scheduling3(schedulingtimes, actionFc);
  //const result = "salt";
  //res.send(await moduleAlertMove.alertMove("정규적으로 메일링 중입니다.", "/"));
  return re;
};

exports.exmailFc = exmailFc;
