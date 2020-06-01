const request = require("supertest");
const server = require("../api/server");

const Tasks = require("./projects-model");
const db = require("../data/dbConfig");

describe('projects router', function() {
    it('should return status 200', function() {
        return request(server)
            .get('/api/projects')
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})