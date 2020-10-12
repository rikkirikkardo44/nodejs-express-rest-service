const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = user => usersRepo.update(user);

const del = id => {
  taskService.delUser(id);
  const users = usersRepo.del(id);
  return users;
};

module.exports = { getAll, get, create, update, del };
