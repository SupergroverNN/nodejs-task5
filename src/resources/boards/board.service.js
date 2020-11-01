const Task = require('../tasks/task.model');
const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);

const remove = async id => {
  await Task.deleteMany({ boardId: id });
  return boardsRepo.remove(id);
};

const add = board => boardsRepo.add(board);
const update = (id, board) => boardsRepo.update(id, board);

module.exports = { getAll, get, remove, add, update };
