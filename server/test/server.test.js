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

    it('getbook should return "Both bookId and chapter are required"', async () => {
        const response = await supertest(testApp).get('/getbook');
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Both bookId and chapter are required');
    });

    it('getbook should return "Nonexistent book/author"', async () => {
        const response = await supertest(testApp).get('/getbook?bookId=8&chapter=1');
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Nonexistent book/author');
    });

    it('getbook should return "Chapter not found"', async () => {
        const response = await supertest(testApp).get('/getbook?bookId=2&chapter=9');
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Chapter not found');
    });

    it('getbook should return book details', async () => {
        const response = await supertest(testApp).get('/getbook?bookId=1&chapter=chapter1');
        expect(response.status).to.equal(200);
    });

    it('searchbook should return an error for missing search parameters', async () => {
        const response = await supertest(recordRoutes)
        .get('/searchbook')
        .expect(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message', 'Both bookId and pat are required');
    });

    it('searchbook should return matches for a given pattern in a book', async () => {
        const response = await supertest(recordRoutes)
        .get('/searchbook?bookId=2&pat=seldom')
        .expect(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('1');
        expect(response.body['1']).to.be.an('array');
    });

    it('searchbook should return "Both bookId and pat are required"', async () => {
        const response = await supertest(testApp).get('/searchbook?bookId=1');
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Both bookId and pat are required');
    });

    it('searchbook should return "Both bookId and pat are required"', async () => {
        const response = await supertest(testApp).get('/searchbook?bookId=10&pat=10');
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Nonexistent book/author');
    });

    it('getbooks should return all results', async () => {
        const response = await supertest(testApp).get('/api/getbooks');
        expect(response.status).to.equal(200);
    });

    it('updatefavorited should return "No document matches the provided query"', async () => {
        const response = await supertest(testApp).put('/api/updatefavorited?bookID=10');
        expect(response.status).to.equal(404);
    });

    it('updatefavorited should return a success message', async () => {
        const req = {
            bookID: '1',
            newFavoriteStatus: false
        };
        const response = await supertest(testApp)
            .put('/api/updatefavorited')
            .set('content-type', 'application/json')
            .send(JSON.stringify(req));
        expect(response.status).to.equal(200);
        expect(response.text).to.equal('Document updated successfully.');
    });

    it('wrong endpoint', async () => {
        const response = await supertest(recordRoutes)
        .get('/wrongendpoint')
        .expect(404);
    });
});