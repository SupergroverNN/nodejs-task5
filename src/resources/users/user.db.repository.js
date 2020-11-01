const User = require('./user.model');

const getAll = async () => User.find({});

const get = async id => User.findOne({ _id: id });

const remove = async id => (await User.deleteOne({ _id: id })).deletedCount;

const add = async user => User.create(user);

const update = async (id, user) => User.updateOne({ _id: id }, user);

module.exports = { getAll, get, remove, add, update };
