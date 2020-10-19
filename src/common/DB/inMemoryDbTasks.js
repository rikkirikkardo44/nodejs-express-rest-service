const Task = require('../../resources/tasks/task.model');
const RestError = require('../error/RestError');

const DB = [];

DB.push(new Task(), new Task(), new Task());

const getAll = async boardId => DB.filter(item => item.boardId === boardId);

const get = async (boardId, taskId) =>
  DB.filter(item => item.boardId === boardId && item.id === taskId)[0];

const create = async task => {
  DB.push(task);
  return task;
};

const update = async (boardId, task) => {
  const id = task.id;
  const oldTask = DB.filter(item => item.id === id && item.boardId === boardId);
  const idx = DB.indexOf(oldTask[0]);
  if (idx < 0) {
    const error = new RestError(
      404,
      `Cant update task with boardID: ${boardId} taskId: ${task.id}`
    );
    throw error;
  }
  DB[idx] = task;
  return task;
};

const del = async (boardId, taskId) => {
  const taskToDelete = DB.filter(
    item => item.boardId === boardId && item.id === taskId
  );
  const idx = DB.indexOf(taskToDelete[0]);
  if (idx < 0) {
    const error = new RestError(
      404,
      `Cant delete task with boardID: ${boardId} taskId: ${taskId}`
    );
    throw error;
  }
  DB.splice(idx, 1);
  return DB.slice(0);
};

const delBoard = boardId => {
  const tasksToDelete = DB.filter(task => task.boardId === boardId);
  tasksToDelete.forEach(task => {
    const idx = DB.indexOf(task);
    DB.splice(idx, 1);
  });
};

const delUser = userId =>
  DB.forEach(item => {
    if (item.userId === userId) {
      item.userId = null;
    }
  });

module.exports = { getAll, get, create, update, del, delBoard, delUser };
