const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHash = async data => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(data, salt);
};

const isCompareWithHash = async (data, hash) => {
  console.log(data, '/', hash);
  return await bcrypt.compare(data, hash);
};

module.exports = {
  getHash,
  isCompareWithHash
};
