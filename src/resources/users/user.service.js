const usersRepo = require('./user.db.repository');
const Task = require('../tasks/task.model');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const remove = async id => {
  await Task.updateMany({ userId: id }, { userId: null });
  return usersRepo.remove(id);
};
const add = user => usersRepo.add(user);
const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, remove, add, update };
