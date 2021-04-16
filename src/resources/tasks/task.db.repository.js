const Task = require('./task.model');
const RestError = require('../../common/error/RestError');

const getAll = async userId => Task.find({ userId });

const get = async (userId, taskId) => {
  const task = await Task.findOne({ userId, _id: taskId });

  if (task === null) {
    const error = new RestError(
      404,
      `Cant get task with userId = ${userId} and taskId = ${taskId}`
    );
    throw error;
  }

  return task;
};

const create = async task => Task.create(task);

const update = async (userId, task) =>
  Task.updateOne({ userId, _id: task._id }, task);

const del = async (userId, taskId) => Task.deleteOne({ userId, _id: taskId });

module.exports = { getAll, get, create, update, del };
