const usersRepo = require('./user.db.repository');
const Task = require('../tasks/task.model');
const { getHash } = require('../../common/tokenUtils');
const bcrypt = require('bcrypt');

const getAll = () => usersRepo.getAll();
const get = (id) => usersRepo.get(id);
const remove = async (id) => {
  await Task.updateMany({ userId: id }, { userId: null });
  return usersRepo.remove(id);
};
const add = async (user) => {
  const { name, login, password } = user;
  const hashedPassword = await getHash(password);
  return usersRepo.add({ name, login, password: hashedPassword });
};

const update = (id, user) => usersRepo.update(id, user);

const getByLoginAndPassword = async (login, password) => {
  const user = await usersRepo.getByLogin(login);
  if (user) {
    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (isValidPassword) {
      return user;
    }
  }

  return false;
};

module.exports = { getAll, get, remove, add, update, getByLoginAndPassword };
