const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();

class ApiRequestService {
  async fetch(url) {
    try {
      console.log(url);
      const response = await fetch(url);
      const json = await response.json();
      return { data: json };
    } catch (error) {
      logger.info(error);
      return { error };
    }
  }
  async postFetch(url, options) {
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return { data: json };
    } catch (error) {
      logger.info(error);
      return { error };
    }
  }
}

module.exports = ApiRequestService;
