const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const { isCompareWithHash } = require('../../common/hashHelper');
const RestError = require('../../common/error/RestError');
const { JWT_SECRET_KEY } = require('../../common/config');

const signToken = async ({ login, password }) => {
  const user = await userService.getByProps({ login });
  const isComparePasswordAndHash = await isCompareWithHash(
    password,
    user.password
  );
  if (!isComparePasswordAndHash) {
    throw new RestError(403, 'Wrong login/password combination');
  } else {
    return jwt.sign({ login, id: user._id }, JWT_SECRET_KEY);
  }
};

module.exports = { signToken };
