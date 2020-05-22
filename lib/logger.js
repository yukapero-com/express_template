const log4js = require('log4js');

var appenders = {
  ConsoleLogAppender: {
    type: 'console',
  },
  SystemLogAppender: {
    type: 'file',
    filename: './log/system/system.log',
    maxLogSize: 10 * (1000 * 1000), // 10MB
    backups: 3,
  },
  AccessLogAppender: {
    type: 'dateFile',
    filename: './log/access/access.log',
    pattern: '.yyyy-MM-dd',
    daysToKeep: 7,
  },
};

var categories = {
  default: {
    appenders: [
      'ConsoleLogAppender'
    ],
    level: 'all'
  },
  system: {
    appenders: [
      'SystemLogAppender',
      'ConsoleLogAppender'
    ],
    level: 'info'
  },
  access: {
    appenders: [
      'AccessLogAppender',
      'ConsoleLogAppender'
    ],
    level: 'info'
  },
};

log4js.configure({
  appenders,
  categories,
});

module.exports = log4js;
