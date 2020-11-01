const DB = require('../../../Database');
const { NotFoundError } = require('../../errors/appError');

const BASE_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(BASE_NAME);

const get = async id => {
  const board = DB.getEntity(BASE_NAME, id);
  if (!board) {
    throw new NotFoundError('Board', { id });
  }
  return board;
};

const remove = async id => {
  if (!(await DB.removeEntity(BASE_NAME, id))) {
    throw new NotFoundError('Board', { id });
  }
  return true;
};

const save = async board => DB.saveEntity(BASE_NAME, 'board', board);

const update = async (id, board) => {
  const entity = await DB.updateEntity(BASE_NAME, id, board);
  if (!entity) {
    throw new NotFoundError('Board', { id });
  }
  return board;
};

module.exports = { getAll, get, remove, save, update };
