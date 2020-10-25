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
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.create(
      new User({
        login,
        password,
        name
      })
    );
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const { name, login, password } = req.body;
    const { id } = req.params;
    const user = new User({
      name,
      login,
      password,
      _id: id
    });

    const updatedUser = (await usersService.update(user)).ok;
    if (updatedUser === 0) {
      const error = new RestError(404, `Cant upadate user with ${id}`);
      throw error;
    }
    res.json();
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    const { id } = req.params;
    const userDelCount = (await usersService.del(id)).deletedCount;
    if (userDelCount === 0) {
      const error = new RestError(404, `Cant delete user with ${id}`);
      throw error;
    }
    res.status(204).json();
  })
);

module.exports = router;
