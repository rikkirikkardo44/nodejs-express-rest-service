const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const morgan = require('morgan');
const logger = require('./common/logger');
const { handleError } = require('./common/error/errors');
const checkToken = require('./common/checkToken');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

process.on('uncaughtException', err => {
  logger.error(`Uncaught exception ${err.name}: ${err.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  const { method, url, body, params } = req;
  logger.info(
    `method=${method} url=${url} params=${JSON.stringify(
      params
    )} body=${JSON.stringify(body)}}`
  );
  next();
});

app.use(morgan('dev'));

app.use('/login', loginRouter);
app.use('/users', checkToken, userRouter);
app.use('/boards', checkToken, boardRouter);
app.use('/users', checkToken, taskRouter);

app.use(handleError);

module.exports = app;
