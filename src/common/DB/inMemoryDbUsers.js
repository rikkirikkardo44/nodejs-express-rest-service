const User = require('../../resources/users/user.model');
const RestError = require('../error/RestError');

const DB = [];

DB.push(new User(), new User(), new User());

const getAll = async () => DB.slice(0);

const get = async id => DB.filter(el => el.id === id)[0];

const create = async user => {
  DB.push(user);
  return user;
};

const update = async user => {
  const id = user.id;
  const oldUser = DB.filter(item => item.id === id);
  const idx = DB.indexOf(oldUser[0]);
  if (idx < 0) {
    const error = new RestError(404, `Cant update user with ${id}`);
    throw error;
  }
  DB[idx] = user;
  return user;
};

const del = async id => {
  const userToDelete = DB.filter(item => item.id === id);
  const idx = DB.indexOf(userToDelete[0]);
  if (idx < 0) {
    const error = new RestError(404, `Cant delete user with ${id}`);
    throw error;
  }
  DB.splice(idx, 1);
  return DB.slice(0);
};

module.exports = { getAll, get, create, update, del };
