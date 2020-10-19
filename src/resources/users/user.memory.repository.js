// const usersDb = require('../../common/DB/inMemoryDbUsers');

// const getAll = async () => usersDb.getAll();

// const get = async id => {
//   const user = await usersDb.get(id);

//   if (!user) {
//     const error = new Error();
//     error.status = 404;
//     error.message = `The user with id: ${id} was not found`;
//     // throw new Error(`The user with id: ${id} was not found`);
//     throw error;
//   }

//   return user;
// };

// const create = async user => usersDb.create(user);

// const update = async user => usersDb.update(user);

// const del = async id => usersDb.del(id);

// module.exports = { getAll, get, create, update, del };

const usersDb = require('../../common/DB/inMemoryDbUsers');

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
