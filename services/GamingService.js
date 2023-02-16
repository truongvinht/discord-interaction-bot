/* eslint-disable no-undef */
const ApiRequestService = require("./ApiRequestService");
const API_SERVER = process.env.API_SERVER || "localhost:3000";
const API_TOKEN = process.env.API_TOKEN || "-";

class GamingService {
  constructor() {
    this.service = new ApiRequestService();
  }

  async asyncFetchAllFigures() {
    const url = `${API_SERVER}/api/yuanshen/characters`;
    return this.service.fetchWithOption(url, {
      headers: {
        'x-api-key': API_TOKEN
      }
    });
  }

  async asyncFetchAllWeaponTypes() {
    const url = `${API_SERVER}/api/yuanshen/characters/types`;
    return this.service.fetchWithOption(url,{
      headers: {
        'x-api-key': API_TOKEN
      }
    });
  }

  async asyncFetchAllElements() {
    const url = `${API_SERVER}/api/yuanshen/elements`;
    return this.service.fetchWithOption(url, {
      headers: {
        'x-api-key': API_TOKEN
      }
    });
  }

  async asyncFetchTodayTalents() {
    const date = new Date();
    let weekday = date.getDay(); // 0-6 Sonntag - Samstag

    switch (weekday) {
    case 0:
        weekday = 7;
        break;
    default:
        weekday = Math.abs(weekday);
    }
    const url = `${API_SERVER}/api/yuanshen/characters/talents/weekday/${weekday}`;
    return this.service.fetchWithOption(url, {
      headers: {
        'x-api-key': API_TOKEN
      }
    });
  }

  async asyncFetchMyFigures(discordId) {
    const url = `${API_SERVER}/api/yuanshen/characters/discord/${discordId}`;
    return this.service.fetchWithOption(url, {
      headers: {
        'x-api-key': API_TOKEN
      }
    });
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

  fetchAllWeaponTypes(callback) {
    const service = this;
    (async () => {
        const result = await service.asyncFetchAllWeaponTypes();
        if (result.error) {
            callback()
          callback(null, result.error);
        } else {
          callback(result.data, null);
        }
      })();
  }

  fetchAllElements(callback) {
    const service = this;
    (async () => {
        const result = await service.asyncFetchAllElements();
        if (result.error) {
            callback()
          callback(null, result.error);
        } else {
          callback(result.data, null);
        }
      })();
  }

  fetchTodayTalents(callback) {
    const service = this;
    (async () => {
        const result = await service.asyncFetchTodayTalents();
        if (result.error) {
            callback()
          callback(null, result.error);
        } else {
          callback(result.data, null);
        }
      })();
  }

  fetchAllMyFigures(discordId, callback) {
    const service = this;
    (async () => {
        const result = await service.asyncFetchMyFigures(discordId);
        if (result.error) {
            callback()
          callback(null, result.error);
        } else {
          callback(result.data, null);
        }
      })();
  }

  fetchAllArtifacts(callback) {
    const url = `${API_SERVER}/api/yuanshen/artifacts`;
    this.service.fetch(url, callback);
  }
}

module.exports = GamingService;
