const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');
const User = require('./user.model');
const { getHash } = require('../../common/hashHelper');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const getByProps = props => usersRepo.getByProps(props);

const create = async ({ name, login, password }) => {
  const passwordHash = await getHash(password);
  const user = new User({
    name,
    login,
    password: passwordHash
  });
  return usersRepo.create(user);
};

const update = async ({ password, name, login }, id) => {
  const passwordHash = await getHash(password);
  const user = new User({
    name,
    login,
    password: passwordHash,
    _id: id
  });
  return usersRepo.update(user);
};

const del = id => {
  taskService.delUser(id);
  return usersRepo.del(id);
};

module.exports = { getAll, get, create, update, del, getByProps };
