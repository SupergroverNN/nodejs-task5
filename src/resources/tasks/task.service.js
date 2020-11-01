const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = id => tasksRepo.get(id);

const getByProps = props => tasksRepo.getByProps(props);

const add = task => tasksRepo.add(task);

const update = (id, task) => tasksRepo.update(id, task);

const remove = id => tasksRepo.remove(id);

module.exports = {
  getAll,
  get,
  getByProps,
  add,
  update,
  remove
};
