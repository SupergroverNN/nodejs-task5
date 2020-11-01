const DB = require('../../../Database');
const { NotFoundError } = require('../../errors/appError');
const BASE_NAME = 'Tasks';

const getAll = async () => DB.getAllEntities(BASE_NAME);

const get = async id => {
  const task = DB.getEntity(BASE_NAME, id);
  if (!task) {
    throw new NotFoundError('Task', { id });
  }
  return task;
};

const remove = async id => {
  if (!(await DB.removeEntity(BASE_NAME, id))) {
    throw new NotFoundError('Task', { id });
  }
  return true;
};

const save = async task => DB.saveEntity(BASE_NAME, 'task', task);

const update = async (id, task) => {
  const entity = await DB.updateEntity(BASE_NAME, id, task);
  if (!entity) {
    throw new NotFoundError('Task', { id });
  }
  return entity;
};

module.exports = { getAll, get, remove, save, update };
