//정규식 체크  체크

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
