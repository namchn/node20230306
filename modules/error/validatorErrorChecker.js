const { validationResult } = require("express-validator");
//에러 constructor
const HttpError = require("../http-error");

const validatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const arr = errors.array();
    const error = new HttpError(
      arr[0].location +
        "/" +
        arr[0].param +
        ": " +
        arr[0].msg +
        ", value: " +
        arr[0].value,
      400
    );
    next(error);
    //return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

exports.validatorErrorChecker = validatorErrorChecker;
