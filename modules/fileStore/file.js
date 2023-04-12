const multer = require("multer");
const path = require("path");

//엑셀 업로드 설정
const uploadFileSingle = (uploadDirectory, uploadExt) => {
  //const uploadDirectory = "./uploads";

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory); //cb 콜백 함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.basename(file.originalname));
      //cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storage }); //multer 객체 생성
  //return upload.single(uploadExt);
  return upload.array(uploadExt, 12);
};

module.exports = {
  uploadFileSingle,
};

//exports.uploadSingle = uploadSingle;
