const { createLogger, format, transports } = require('winston');
const path = require('path');

const logsDir = '../../logs';
const errorLogFile = path.join(__dirname, logsDir, 'error.log');
const infoLogFile = path.join(__dirname, logsDir, 'info.log');

const logFormat = format.combine(
  format.timestamp({ foramat: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
);

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console(),
    new transports.File({
      filename: errorLogFile,
      level: 'error',
      format: logFormat
    }),
    new transports.File({
      filename: infoLogFile,
      level: 'info',
      format: logFormat
    })
  ],
  format: format.combine(
    format.colorize({ colors: { silly: 'yellow' }, message: true }),
    format.printf(info => info.message)
  ),
  exitOnError: false
});

module.exports = logger;
