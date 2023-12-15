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
});