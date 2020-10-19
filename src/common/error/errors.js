const logger = require('../logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const asyncHandleError = cb => async (req, res, next) => {
  try {
    return await cb(req, res, next);
  } catch (e) {
    return next(e);
  }
};

const handleError = (err, req, res, next) => {
  if (err) {
    const status = err.status ? err.status : INTERNAL_SERVER_ERROR;
    const message = err.message ? err.message : getStatusText(status);
    logger.error(`status=${status} message=${message}`);
    res.status(status).json({ message: getStatusText(status) });
  }
  next();
};

module.exports = { asyncHandleError, handleError };
