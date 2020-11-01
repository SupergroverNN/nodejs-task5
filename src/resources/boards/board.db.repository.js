const Board = require('./board.model');
const { NotFoundError } = require('../../errors/appError');

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);
  if (board === null) {
    throw new NotFoundError('Board', { id });
  }
  return board;
};

const remove = async id => (await Board.deleteOne({ _id: id })).deletedCount;

const add = async board => Board.create(board);

const update = async (id, board) => {
  return Board.updateOne({ _id: id }, board);
};

module.exports = { getAll, get, remove, add, update };
