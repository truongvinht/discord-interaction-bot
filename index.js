const app = require('./service');
const LogHelper = require('./loaders/loghelper');
const logger = LogHelper.getInstance();

app.listen(8999, () => {
    logger.info(`Discord Interaction Server is running`);
})