const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = user => usersRepo.update(user);

const del = id => {
  taskService.delUser(id);
  return usersRepo.del(id);
};

module.exports = { getAll, get, create, update, del };
