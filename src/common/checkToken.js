const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');
const RestError = require('./error/RestError');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new RestError(401, 'Unauthorized user');
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (e) {
        throw new RestError(401, `${e.name}:${e.message}`);
      }
      return next();
    }
  }
  throw new RestError(401, 'Unauthorized user');
};
