/* eslint-disable no-undef */

// GamingService.test.js
// Testing Gaming Service
// ================

const GamingService = require("./GamingService");

describe("Test Gaming Service", () => {
  it("Get all Figures", async () => {
    const service = new GamingService();
    const result = await service.asyncFetchAllFigures();
    expect(result.data).not.toBeNull();
    console.log(result.data);
  });
});
