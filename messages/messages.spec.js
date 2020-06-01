const request = require("supertest");
const server = require("../api/server.js");

describe("messages router", function() {
  it("should return status 200", function() {
    return request(server)
      .get("/api/messages")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

});