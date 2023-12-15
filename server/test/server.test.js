const supertest = require('supertest');
const chai = require('chai');
const express = require('express');
const { recordRoutes, client } = require('/Users/franksi-unchiu/Desktop/CS/cs32/term-project-azhou76-mfu16-jhaskell-schiu4/server/routes/read.js');

const expect = chai.expect;

// Create a new instance of Express router for testing
const testApp = express();
testApp.use(recordRoutes);

describe('read.js route tests', () => {
    before(async () => {
        // Connect to the MongoDB database before running the tests
        await client.connect();
    });

    after(async () => {
        // Close the MongoDB connection after running the tests
        await client.close();
    });

    it('should return "Both bookId and chapter are required"', async () => {
        const response = await supertest(testApp).get('/getbook');
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Both bookId and chapter are required');
    });

    it('should return "Nonexistent book/author"', async () => {
        const response = await supertest(testApp).get('/getbook?bookId=8&chapter=1');
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Nonexistent book/author');
    });

    it('should return "Chapter not found"', async () => {
        const response = await supertest(testApp).get('/getbook?bookId=2&chapter=9');
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Chapter not found');
    });

    it('should return book details', async () => {
        const response = await supertest(testApp).get('/getbook?bookId=0&chapter=0');
        expect(response.status).to.equal(200);
    });
});
