const boardsDb = require('../../common/inMemoryDbBoards');

const getAll = async () => boardsDb.getAll();

const get = async id => {
  const board = await boardsDb.get(id);

  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }

  return board;
};

const create = async board => boardsDb.create(board);

const update = async board => boardsDb.update(board);

const del = async id => boardsDb.del(id);

module.exports = { getAll, get, create, update, del };
