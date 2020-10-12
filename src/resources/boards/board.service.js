const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = board => boardsRepo.update(board);

const del = id => {
  taskService.delBoard(id);
  const boards = boardsRepo.del(id);
  return boards;
};

module.exports = { getAll, get, create, update, del };
