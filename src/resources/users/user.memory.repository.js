const usersDb = require('../../common/inMemoryDbUsers');

const getAll = async () => usersDb.getAll();

const get = async id => {
  const user = await usersDb.get(id);

  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }

  return user;
};

const create = async user => usersDb.create(user);

const update = async user => usersDb.update(user);

const del = async id => usersDb.del(id);

module.exports = { getAll, get, create, update, del };
