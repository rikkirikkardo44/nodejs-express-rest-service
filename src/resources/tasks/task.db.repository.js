const Task = require('./task.model');
const RestError = require('../../common/error/RestError');

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, taskId) => {
  const task = await Task.findOne({ boardId, _id: taskId });

  if (task === null) {
    const error = new RestError(
      404,
      `Cant get task with boardId = ${boardId} and taskId = ${taskId}`
    );
    throw error;
  }

  return task;
};

const create = async task => Task.create(task);

const update = async (boardId, task) =>
  Task.updateOne({ boardId, _id: task._id }, task);

const del = async (boardId, taskId) => Task.deleteOne({ boardId, _id: taskId });

const delBoard = async boardId => Task.deleteMany({ boardId });

const delUser = async userId => Task.updateMany({ userId }, { userId: null });

module.exports = { getAll, get, create, update, del, delBoard, delUser };
