const Board = require('./board.model');
const RestError = require('../../common/error/RestError');

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);

  if (board === null) {
    const error = new RestError(404, `Cant get board with ${id}`);
    throw error;
  }

  return board;
};

const create = async board => Board.create(board);

const update = async board => Board.updateOne({ _id: board._id }, board);

const del = async id => Board.deleteOne({ _id: id });

module.exports = { getAll, get, create, update, del };
