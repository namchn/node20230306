//정규식 체크

//정규식 특수 문자
//let regex = /^\d+$/;
//let regex = new RegExp(^\d+$);  //실행 시점에 동적으로 생성

/*
exec =match 배열 반환
test 대응 true
search 없으면 -1
replace
split 배열 반환
*/

const testRegex = async (regex, value) => {
  let isValid = regex.test(value); // false
  return await isValid;
};

const matchRegex = async (regex, value) => {
  let isValid = value.match(regex); // null
  return await isValid;
};

module.exports = {
  testRegex,
  matchRegex,
};

//exports.testRegex = testRegex;
//exports.matchRegex = matchRegex;
