const User = require('./user.model');
const RestError = require('../../common/error/RestError');

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findById(id);
  if (user === null) {
    throw new RestError(404, `Cant get user with ${id}`);
  }

  return user;
};

const getByProps = async props => {
  const user = await User.find(props);
  if (user === null) {
    throw new RestError(404, `Cant get user with ${props}`);
  }
  return user[0];
};

const create = async user => User.create(user);

const update = async user => User.updateOne({ _id: user.id }, user);

const del = async id => User.deleteOne({ _id: id });

module.exports = { getAll, get, create, update, del, getByProps };
