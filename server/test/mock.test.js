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

    // Test case for the getbook endpoint
    it('getbook should return "Both bookId and chapter are required"', async () => {
        const response = await supertest(testApp).get('/getbook');
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Both bookId and chapter are required');
    });

    // Test case for non-existent book/author
    it('getbook should return "Nonexistent book/author"', async () => {
        const response = await supertest(testApp).get('/getbook?bookId=8&chapter=1');
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Nonexistent book/author');
    });

    // Test case for non-existent chapter
    it('getbook should return "Chapter not found"', async () => {
        const response = await supertest(testApp).get('/getbook?bookId=2&chapter=9');
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Chapter not found');
    });

    // Test case for successfully getting book details
    it('getbook should return book details', async () => {
        const response = await supertest(testApp).get('/getbook?bookId=1&chapter=chapter1');
        expect(response.status).to.equal(200);
    });

    // Test case for missing search parameters
    it('searchbook should return an error for missing search parameters', async () => {
        const response = await supertest(recordRoutes)
            .get('/searchbook')
            .expect(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message', 'Both bookId and pat are required');
    });

    // Test case for searching with a pattern in a book
    it('searchbook should return matches for a given pattern in a book', async () => {
        const response = await supertest(recordRoutes)
            .get('/searchbook?bookId=2&pat=seldom')
            .expect(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('1');
        expect(response.body['1']).to.be.an('array');
    });

    // Test case for missing pat in searchbook
    it('searchbook should return "Both bookId and pat are required"', async () => {
        const response = await supertest(testApp).get('/searchbook?bookId=1');
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Both bookId and pat are required');
    });

    // Test case for non-existent book/author in searchbook
    it('searchbook should return "Nonexistent book/author"', async () => {
        const response = await supertest(testApp).get('/searchbook?bookId=10&pat=10');
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Nonexistent book/author');
    });

    // Test case for getting all books
    it('getbooks should return all results', async () => {
        const response = await supertest(testApp).get('/api/getbooks');
        expect(response.status).to.equal(200);
    });

    // Test case for "No document matches the provided query" in updatefavorited
    it('updatefavorited should return "No document matches the provided query"', async () => {
        const response = await supertest(testApp).put('/api/updatefavorited?bookID=10');
        expect(response.status).to.equal(404);
    });

    // Test case for successfully updating favorited status
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

    // Test case for accessing a wrong endpoint
    it('wrong endpoint should return 404', async () => {
        const response = await supertest(recordRoutes)
            .get('/wrongendpoint')
            .expect(404);
    });

    // Test case for adding a comment and returning a success message
    it('addcomment should return a success message', async () => {
        const req = {
            bookId: "2",
            chapter: "chapter3",
            startIndex: "20",
            endIndex: "21",
            comment: "test comment"
        };
        const response = await supertest(testApp)
            .put('/addcomment')
            .set('content-type', 'application/json')
            .send(JSON.stringify(req));
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Document updated successfully.');
    });

    // Test case for adding a comment to a non-existent document
    it('addcomment should return "Document not found."', async () => {
        const req = {
            bookId: "100",
            chapter: "chapter3",
            startIndex: "20",
            endIndex: "21",
            comment: "test comment"
        };
        const response = await supertest(testApp)
            .put('/addcomment')
            .set('content-type', 'application/json')
            .send(JSON.stringify(req));
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Document not found.');
    });
});
