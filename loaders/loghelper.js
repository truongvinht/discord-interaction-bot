// logHelper.js
// Logging Helper to wrap logger access.
// ==================

const pino = require('pino');
/**
 * Logging Helper to wrap logger access.
 */
class LogHelper {
    // init logger manager
    constructor () {
        LogHelper.instance = this;

        // default loglevel: info
        this.logger = pino({
            level: 'info'
        });
    }

    // access singleton instance
    static getInstance () {
        if (!LogHelper.instance) {
            LogHelper.instance = new LogHelper();
        }
        return LogHelper.instance;
    }

    // update log level
    setLoglevel (loglevel) {
        this.logger = pino({
            level: loglevel
        });
    }

    debug (message) {
        this.logger.debug(message);
    }

    debugWithArgs (httpMethod, path, method, other) {
        if (other == null || other === undefined) {
            this.logger.error(`${httpMethod} request ${path} for '${method}'`);
        } else {
            this.logger.error(`${httpMethod} request ${path} for '${method}' [${other}]`);
        }
    }

    info (message) {
        this.logger.info(message);
    }

    error (message) {
        this.logger.error(message);
    }

    errorWithArgs (httpMethod, path, method, other) {
        if (other == null || other === undefined) {
            this.logger.error(`${httpMethod} request ${path} for '${method}' failed`);
        } else {
            this.logger.error(`${httpMethod} request ${path} for '${method}' failed [${other}]`);
        }
    }
};

module.exports = LogHelper;
