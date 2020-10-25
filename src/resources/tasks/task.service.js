const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);

const create = task => tasksRepo.create(task);

const update = (boardId, task) => tasksRepo.update(boardId, task);

const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);

const delBoard = boardId => tasksRepo.delBoard(boardId);

const delUser = userId => tasksRepo.delUser(userId);

module.exports = { getAll, get, create, update, del, delBoard, delUser };
