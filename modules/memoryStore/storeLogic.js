const storeLogic = async (useYn, memoryStore, key, result) => {
  let Info = false;
  let isStored = false;
  Info = memoryStore[key];
  if (useYn && Info) {
    console.log(key + "에 저장되어 있음");
    isStored = true;
    result = Info;
  } else {
    console.log(key + "에 저장되어 있지 않음");
    isStored = false;
  }
  return await { isStored, result };
};
module.exports = {
  storeLogic,
};
