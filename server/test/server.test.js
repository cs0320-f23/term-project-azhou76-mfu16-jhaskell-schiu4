const express = require('express');
const supertest = require('supertest');
const chai = require('chai');
const app = require('/Users/franksi-unchiu/Desktop/CS/cs32/term-project-azhou76-mfu16-jhaskell-schiu4/server/routes/read.js');
const expect = chai.expect;

describe('Express App Tests', () => {
it('should return "Both bookId and pat are required"', async () => {
    const response = await supertest(app).get('/getbook?bookId=1');
    expect(response.status).to.equal(400);
    // Add more assertions based on the expected response
});
});
