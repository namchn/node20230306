const express = require("express");
const router = express.Router();
const cors = require("cors"); //cross-origin 요청

const { check } = require("express-validator");

const jsName = "board";
const boardController = require("../controllers/board-controller");

//const checkAuth = require("../middleware/check-auth");
//const fileUpload = require("../middleware/file-upload");

router.use(cors()); //cors 사용
//const bodyParser = require("body-parser");
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  express.json({
    limit: "50mb", //  요청 body 크기 제한
  })
);

const HttpError = require("../modules/http-error");
// https://velog.io/@yunsungyang-omc/Node.js-express%EC%97%90%EC%84%9C-%EC%97%90%EB%9F%AC%EB%A1%9C-HTTP-status-code-%ED%86%B5%EC%A0%9C%ED%95%98%EA%B8%B0

/*  
router.use((req, res, next) => {
  const error = new HttpError("경로를 찾을 수 없습니다.", 404);
  throw error;
  //next(error);
});
*/

router.use(express.urlencoded({ extended: true }));

// 에러 처리
router.use((error, req, res, next) => {
  // if (req.file) {
  //   fs.unlink(req.file.path, (err) => {
  //     console.log(err);
  //   });
  // }
  console.log(req);
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//ejs

//멤버 가입폼 @
router.get("/", async (req, res) => {
  //const result = await mysql.query("memberInsert", req.body.param);
  console.log(jsName + "/");
  //res.redirect("/login/home.html");
  //res.send("result!");
  res.render("board/boardList", {
    title: "나는 나는 남천우 입니다.",
    length: 5,
  });
});

//멤버 가입폼 @
router.get("/get", boardController.getTest);

//멤버 가입폼 @
router.get("/home", boardController.home);

//멤버 전체 검색@
router.get("/memberList", boardController.memberList);

//글쓰기 폼
router.get("/write", boardController.writeForm);

//글쓰기 insert
router.post("/insert", boardController.insert);

//글쓰기 post
router.get("/edit", boardController.editForm);

//글쓰기 post
router.post("/post", boardController.PostTest);

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
