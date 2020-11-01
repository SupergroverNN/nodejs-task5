const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.File({
      filename: './src/error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

logger.info();
logger.error();

module.exports = { logger };
