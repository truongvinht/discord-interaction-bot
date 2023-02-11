const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();
// eslint-disable-next-line no-undef
const API_SERVER = process.env.API_SERVER || "localhost:3000";

class ApiRequestService {
  static cmd = "debug";
  constructor(path) {
    this.path = path;
  }

  fetch(callback) {
    const response = fetch(`${API_SERVER}/${this.path}`)
      .then((response) => response.json())
      .catch((error) => {
        callback(null, error);
        logger.info(error);
      });

    response.then((content) => {
      callback(content, null);
    });
  }
}

module.exports = ApiRequestService;
