const express = require("express");
const router = express.Router();
const {
  check,
  query,
  param,
  body,
  validationResult,
} = require("express-validator"); //유효성 검사
const moduleValidatorErrorChecker = require("../modules/error/validatorErrorChecker");
const compression = require("compression"); //응답을 압축
const cors = require("cors"); //cross-origin 요청
const boardController = require("../controllers/board-controller");

const jsName = "board";

//글쓰기 폼
let writeFormValidList = [
  query("board_no").trim().not().isEmpty().withMessage("유효값 필요"),
  moduleValidatorErrorChecker.validatorErrorChecker,
];
router.get("/write", writeFormValidList, boardController.writeForm);

//글쓰기 insert
let insertValidList = [
  body("writer_nm")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 100 })
    .bail()
    .isString()
    .withMessage("유효값 필요"),
  body("title").trim().not().isEmpty().isString().withMessage("유효값 필요"),
  body("text")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 4000 })
    .bail()
    .isString()
    .withMessage("유효값 필요"),
  body("board_no")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .isNumeric()
    .withMessage("유효값 필요"),
  moduleValidatorErrorChecker.validatorErrorChecker,
];
router.post("/insert", insertValidList, boardController.insert);

//글수정 폼
let editValidList = [
  query("article_no")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .isNumeric()
    .withMessage("유효값 필요"),
  moduleValidatorErrorChecker.validatorErrorChecker,
];
router.get("/edit", editValidList, boardController.editForm);

//글목록
let listValidList = [
  query("board_no")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .isNumeric()
    .withMessage("유효값 필요"),
  moduleValidatorErrorChecker.validatorErrorChecker,
];
router.get("/list", listValidList, boardController.writeList);

//글 상세보기
let viewValidList = [
  query("article_no")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .isNumeric()
    .withMessage("유효값 필요"),
  moduleValidatorErrorChecker.validatorErrorChecker,
];
router.get("/view", viewValidList, boardController.view);

//글쓰기 update
let updateValidList = [
  body("article_no")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .isNumeric()
    .withMessage("유효값 필요"),
  body("writer_nm")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 100 })
    .bail()
    .isString()
    .withMessage("유효값 필요"),
  body("title")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 100 })
    .bail()
    .isString()
    .withMessage("유효값 필요"),
  body("text")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 4000 })
    .bail()
    .isString()
    .withMessage("유효값 필요"),
  body("board_no")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .isNumeric()
    .withMessage("유효값 필요"),
  moduleValidatorErrorChecker.validatorErrorChecker,
];
router.post("/update", updateValidList, boardController.update);

//글쓰기 delete
let deleteValidList = [
  query("article_no")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .isNumeric()
    .withMessage("유효값 필요"),
  query("board_no")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .isNumeric()
    .withMessage("유효값 필요"),
  moduleValidatorErrorChecker.validatorErrorChecker,
];
router.get("/delete", deleteValidList, boardController.deleteOne);

//모듈 주입
module.exports = router;
