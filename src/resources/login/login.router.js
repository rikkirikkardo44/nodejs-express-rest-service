const router = require('express').Router();
const { asyncHandleError } = require('../../common/error/errors');
const loginService = require('./login.service');
const RestError = require('../../common/error/RestError');

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const { body } = req;
    const token = await loginService.signToken(body);
    if (!token) {
      throw new RestError(403, 'Cant authentication');
    }
    res.status(200).json({ token });
  })
);

module.exports = router;
