const tasksRepo = require('./task.db.repository');

const getAll = userId => tasksRepo.getAll(userId);

const get = (userId, taskId) => tasksRepo.get(userId, taskId);

const create = task => tasksRepo.create(task);

const update = (userId, task) => tasksRepo.update(userId, task);

const del = (userId, taskId) => tasksRepo.del(userId, taskId);

module.exports = { getAll, get, create, update, del };
