const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { asyncHandleError } = require('../../common/error/errors');
const RestError = require('../../common/error/RestError');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    try {
      const user = await usersService.get(req.params.id);
      res.json(User.toResponse(user));
    } catch (e) {
      const error = new RestError(404, e.message);
      throw error;
    }
  })
);

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const user = await usersService.create(
      new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      })
    );

    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const user = new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    user.id = req.params.id;

    const updatedUser = await usersService.update(user);

    res.json(User.toResponse(updatedUser));
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    const users = await usersService.del(req.params.id);
    res.status(204).json(users);
  })
);

module.exports = router;
