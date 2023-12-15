const supertest = require('supertest');
const chai = require('chai');
const express = require('express');
const { recordRoutes } = require('/Users/franksi-unchiu/Desktop/CS/cs32/term-project-azhou76-mfu16-jhaskell-schiu4/server/routes/read.js');

const expect = chai.expect;

// Create a new instance of Express router for testing
const testApp = express();
testApp.use(recordRoutes);

describe('read.js route tests', () => {
    it('should return "Both bookId and pat are required"', async () => {
        const response = await supertest(testApp).get('/getbook');
        expect(response.status).to.equal(400);
    });
});
