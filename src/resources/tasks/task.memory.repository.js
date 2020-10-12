const tasksDb = require('../../common/inMemoryDbTasks');

const getAll = async boardId => tasksDb.getAll(boardId);

const get = async (boardId, taskId) => {
  const task = await tasksDb.get(boardId, taskId);

  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }

  return task;
};

const create = async task => tasksDb.create(task);

const update = async (boardId, task) => tasksDb.update(boardId, task);

const del = async (boardId, taskId) => tasksDb.del(boardId, taskId);

const delBoard = async boardId => tasksDb.delBoard(boardId);

const delUser = async userId => tasksDb.delUser(userId);

module.exports = { getAll, get, create, update, del, delBoard, delUser };
