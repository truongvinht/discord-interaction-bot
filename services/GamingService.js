const ApiRequestService = require("./ApiRequestService");
// eslint-disable-next-line no-undef
const API_SERVER = process.env.API_SERVER || "localhost:3000";

class GamingService {
  constructor() {
    this.service = new ApiRequestService();
  }
  async asyncFetchAllFigures() {
    const url = `${API_SERVER}/api/yuanshen/characters`;
    return this.service.fetch(url);
  }

  fetchAllFigures(callback) {

    const service = this;

    (async () => {
        const result = await service.asyncFetchAllFigures();
        if (result.error) {
            callback()
          callback(null, result.error);
        } else {
          callback(result.data, null);
        }
      })();
  }

  fetchAllElements(callback) {
    const url = `${API_SERVER}/api/yuanshen/elements`;
    this.service.fetch(url, callback);
  }

  fetchAllArtifacts(callback) {
    const url = `${API_SERVER}/api/yuanshen/artifacts`;
    this.service.fetch(url, callback);
  }

  fetchAllWeaponTypes(callback) {
    const url = `${API_SERVER}/api/yuanshen/characters/types`;
    this.service.fetch(url, callback);
  }
}

module.exports = GamingService;
