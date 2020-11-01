const Task = require('./task.model');
const { NotFoundError } = require('../../errors/appError');

const getAll = async boardId => Task.find({ boardId });

const get = async id => {
  const task = await Task.findById(id);
  if (task === null) {
    throw new NotFoundError('Task', { id });
  }
  return task;
};

const getByProps = async props => {
  const tasks = await Task.find(props);
  return tasks;
};

const remove = async id => (await Task.deleteOne({ _id: id })).deletedCount;

const add = async task => await Task.create(task);

const update = async (id, task) => Task.updateOne({ _id: id }, task);

module.exports = { getAll, get, remove, add, update, getByProps };
