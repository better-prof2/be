require("dotenv").config();
const request = require("supertest");
const server = require("./server");

describe("server", function() {
  describe("environment", function() {
    it("should use the testing environment", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe("students-router", function() {
    it("return 401 ", async() => {
        const response = await request(server).get('/api/students');
        expect(response.status).toBe(404);
    });
  });

  describe("users-router -- view all user's students", function() {
    it("return 401", async() => {
        const response = await request(server).get('/api/users/all-students');
        expect(response.status).toBe(401);
    });
  });

});