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
    const user = await usersService.create({
      login,
      password,
      name
    });
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    const updatedUser = (await usersService.update(body, id)).ok;
    if (updatedUser === 0) {
      throw new RestError(404, `Cant update user with ${id}`);
    }
    res.json();
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    const { id } = req.params;
    const userDelCount = (await usersService.del(id)).deletedCount;
    if (userDelCount === 0) {
      throw new RestError(404, `Cant delete user with ${id}`);
    }
    res.status(204).json();
  })
);

module.exports = router;
