const Board = require('../resources/boards/board.model');

const DB = [];

DB.push(new Board(), new Board(), new Board());

const getAll = async () => DB.slice(0);

const get = async id => DB.filter(el => el.id === id)[0];

const create = async board => {
  DB.push(board);
  return board;
};

const update = async board => {
  const id = board.id;
  const oldBoard = DB.filter(item => item.id === id);
  const idx = DB.indexOf(oldBoard[0]);
  DB[idx] = board;
  return board;
};

const del = async id => {
  const boardToDelete = DB.filter(item => item.id === id);
  const idx = DB.indexOf(boardToDelete[0]);
  DB.splice(idx, 1);
  return DB.slice(0);
};

module.exports = { getAll, get, create, update, del };
