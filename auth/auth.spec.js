const request = require("supertest");
const server = require("../api/server");

describe("auth router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("professor registration", function() {
    function generateToken(user) {
      const payload = {
          userId: user.id,
          username: user.username,
          user: user.password
        },
        options = {
          expiresIn: "10min"
        };

      return jwt.sign(payload, jwtSecret, options);
    }

    const user = { fullname:"name", email:"test@email.com", username: "abc1", password: "123abc" };
    const authorize = {};

    beforeAll(async () => {
      authorize.token = generateToken(user);
    });
  });

  describe("professor login", function() {
    function generateToken(user) {
      const payload = {
          userId: user.id,
          username: user.username,
          user: user.password
        },
        options = {
          expiresIn: "10min"
        };

      return jwt.sign(payload, jwtSecret, options);
    }

    const user = { username: "abc1", password: "123abc" };
    const authorize = {};

    beforeAll(async () => {
      authorize.token = generateToken(user);
    });
  });


});