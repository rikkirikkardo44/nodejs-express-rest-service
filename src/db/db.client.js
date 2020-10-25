const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const Board = require('../resources/boards/board.model');
const Column = require('../resources/columns/columns.model');
const Task = require('../resources/tasks/task.model');
const User = require('../resources/users/user.model');

const users = [
  new User({ name: 'user1', login: 'login1', password: 'password' }),
  new User({ name: 'user2', login: 'login2', password: 'p@ssword' })
];

const boards = [
  new Board({
    title: 'board1',
    columns: [
      new Column({ title: 'title1', order: 1 }),
      new Column({ title: 'title2', order: 2 })
    ]
  }),
  new Board({
    title: 'board2',
    columns: [
      new Column({ title: 'title1', order: 1 }),
      new Column({ title: 'title2', order: 2 })
    ]
  })
];

const tasks = [
  new Task({ title: 'task1', order: 1, description: 'description1' }),
  new Task({ title: 'task2', order: 2, description: 'description2' })
];

const connectToDb = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('we are connect!');
    db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    cb();
  });
};

module.exports = connectToDb;
