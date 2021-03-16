const app = require("../../app");
const routes = require("../../src/v1/routes");
const mongoose = require("mongoose");
const supertest = require("supertest");

// require file path
var filePath = require('../../config/initializers');

beforeEach((done) => {
    mongoose.connect(filePath.db_staging,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});


test("GET /api/v1/kycs", async () => {

    await supertest(app).get("/api/v1/kycs")
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);
        });
});
