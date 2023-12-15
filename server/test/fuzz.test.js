const supertest = require('supertest');
const chai = require('chai');
const express = require('express');
const { recordRoutes, client } = require('../routes/read.js');

const expect = chai.expect;

// Create a new instance of Express router for testing
const testApp = express();
testApp.use(recordRoutes);

// Test suite for read.js route
describe('read.js route tests', () => {
    // Setup: Connect to the MongoDB database before running the tests
    before(async () => {
        await client.connect();
    });

    // Teardown: Close the MongoDB connection after running the tests
    after(async () => {
        await client.close();
    });

    // Test case for randomly generated book IDs
    for (let i = 0; i < 10; i++) {
        const randomBookId = Math.floor(Math.random() * 10) + 1;

        it(`getbook should return details for book ID ${randomBookId}`, async () => {
            const response = await supertest(testApp).get(`/getbook?bookId=${randomBookId}&chapter=chapter1`);

            if (randomBookId <= 6) {
                expect(response.status).to.equal(200);
                // You may want to add additional expectations for successful response details
            } else {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal('Nonexistent book/author');
            }
        });
    }

    // Test case for randomly generated book IDs
    for (let i = 0; i < 10; i++) {
        const randomBookId = Math.floor(Math.random() * 10) + 1;

        it(`getbook should return details for book ID ${randomBookId}`, async () => {
            const response = await supertest(testApp).get(`/getbook?bookId=${randomBookId}&chapter=chapter1`);

            if (randomBookId <= 6) {
                expect(response.status).to.equal(200);
                // You may want to add additional expectations for successful response details
            } else {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal('Nonexistent book/author');
            }
        });
    }
});
