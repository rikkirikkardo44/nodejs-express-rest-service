// const boardsDb = require('../../common/DB/inMemoryDbBoards');

// const getAll = async () => boardsDb.getAll();

// const get = async id => {
//   const board = await boardsDb.get(id);

//   if (!board) {
//     throw new Error(`The board with id: ${id} was not found`);
//   }

//   return board;
// };

// const create = async board => boardsDb.create(board);

// const update = async board => boardsDb.update(board);

// const del = async id => {
//   const isDelete = await boardsDb.del(id);
//   if (!isDelete) {
//     const error = new Error();
//     error.status = 404;
//     error.message = `Error to delete board with ${id}`;
//     throw error;
//   }
// };

// module.exports = { getAll, get, create, update, del };

const boardsDb = require('../../common/DB/inMemoryDbBoards');

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
