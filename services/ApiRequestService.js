const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();

class ApiRequestService {
  async fetch(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return { data: json };
    } catch (error) {
      logger.info(error);
      return { error };
    }
  }
}

module.exports = ApiRequestService;
