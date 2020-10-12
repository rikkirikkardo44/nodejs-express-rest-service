const User = require('../resources/users/user.model');

const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => DB.slice(0);

const getUser = async id => DB.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.push(user);
  return user;
};

const updateUser = async user => {
  const id = user.id;
  const oldUser = DB.filter(item => item.id === id);
  const idx = DB.indexOf(oldUser[0]);
  DB[idx] = user;
  return user;
};

const deleteUser = async id => {
  DB.filter(item => item.id !== id);
  return DB.slice(0);
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
