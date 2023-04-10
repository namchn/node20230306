const express = require("express");
const router = express.Router();
const compression = require("compression"); //응답을 압축
const cors = require("cors"); //cross-origin 요청

const jsName = "daily";
const dailyController = require("../controllers/daily-controller");

//router.use(cors()); //cors 사용
router.use(
  express.json({
    limit: "50mb", //  요청 body 크기 제한
  })
);
//const bodyParser = require("body-parser");
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: true }));

//개일일기 글쓰기 폼
router.get("/write", dailyController.writeForm);
//개일일기 글쓰기 insert
router.post("/insert", dailyController.insert);
//개일일기 글쓰기 post
router.get("/edit", dailyController.editForm);
//개일일기 글목록
router.get("/list", dailyController.writeList);
//개일일기 글 상세보기
router.get("/view", dailyController.view);
//개일일기 글쓰기 update
router.post("/update", dailyController.update);
//개일일기 글쓰기 delete
router.get("/delete", dailyController.deleteOne);

//모듈 주입
module.exports = router;
