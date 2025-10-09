const winston = require('winston');
const { LOG_DB_URL } = require('./server.config');
require('winston-mongodb');

const allowedTransports = [];

// The below transport configuration enables logging on console. 
allowedTransports.push(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        // second argument which defines exactly what is going to be printed in the log
        winston.format.printf(log => `${log.timestamp} [${log.level}]: ${log.message}`)
    )
}));

// The below transport configuration enables logging on mongo db.
allowedTransports.push(new winston.transports.MongoDB({
    db: LOG_DB_URL,
    level: 'error',
    collection: 'logs',
}));

// The below transport configuration enables logging in file.
allowedTransports.push(new winston.transports.File({
    filename: `app.log`
}));

const logger = winston.createLogger({
    format: winston.format.combine(
        // winston.format.colorize(),
        // first argument is deining how we want ts to come up
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        // second argument which defines exactly what is going to be printed in the log
        winston.format.printf(log => `${log.timestamp} [${log.level}]: ${log.message}`)

    ),
    transports: allowedTransports
});

module.exports = logger;