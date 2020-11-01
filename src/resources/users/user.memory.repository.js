const DB = require('../../../Database');
const { NotFoundError } = require('../../errors/appError');

const BASE_NAME = 'Users';

const getAll = async () => DB.getAllEntities(BASE_NAME);

const get = async id => {
  const user = DB.getEntity(BASE_NAME, id);
  if (!user) {
    throw new NotFoundError('User', { id });
  }
  return user;
};

const remove = async id => {
  if (!(await DB.removeEntity(BASE_NAME, id))) {
    throw new NotFoundError('User', { id });
  }
};

const save = async user => DB.saveEntity(BASE_NAME, 'user', user);

const update = async (id, user) => {
  const entity = await DB.updateEntity(BASE_NAME, id, user);
  if (!entity) {
    throw new NotFoundError('User', { id });
  }
  return user;
};

module.exports = { getAll, get, remove, save, update };
