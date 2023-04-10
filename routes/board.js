const express = require("express");
const router = express.Router();
const compression = require("compression"); //응답을 압축
const cors = require("cors"); //cross-origin 요청

const jsName = "board";
const boardController = require("../controllers/board-controller");

//router.use(cors()); //cors 사용
router.use(
  express.json({
    limit: "50mb", //  요청 body 크기 제한
  })
);
//const bodyParser = require("body-parser");
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: true }));

//글쓰기 폼
router.get("/write", boardController.writeForm);
//글쓰기 insert
router.post("/insert", boardController.insert);
//글쓰기 post
router.get("/edit", boardController.editForm);
//글목록
router.get("/list", boardController.writeList);
//글 상세보기
router.get("/view", boardController.view);
//글쓰기 update
router.post("/update", boardController.update);
//글쓰기 delete
router.get("/delete", boardController.deleteOne);
//모듈 주입
module.exports = router;
