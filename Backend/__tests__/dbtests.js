const {connectDB, disconnectDB} = require('../dbconnect')
const express = require('express')
const supertest = require('supertest')

const testroute = require('../routes/testroutes');
const app = express()
const request = supertest(app)

app.use('/test/', testroute)

describe('db connection test', () => {
    beforeAll(() => {
        connectDB();
      });
    
    afterAll(() => {
        disconnectDB();
      });
    
    describe('POST', () => {
        it('example request using a mocked database instance', async () => {
          const res = await request.post('/test/', {
              testMsg: 'Test'
          });
    
          expect(res.status).toBe(200);
        });
    });
});

