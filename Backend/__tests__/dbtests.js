const express = require('express')
const supertest = require('supertest')
const Recipe = require('../models/recipe');
const recipeRoutes = require('../routes/recipeRoutes');
const app = express()
const request = supertest(app)

app.use('/recipes/', recipeRoutes)

describe('db connection test', () => {
    beforeAll(() => {
        connectDB();
      });
    
    describe('POST mock test', () => {
        it('makes a request to mock DB', async () => {
          try {
            const res = await request.post('recipes/', {
              testMsg: 'Test'
          }).then()
          } catch(err) {
            console.log(err)
          } finally {
            expect(res.status).toBe(200)
          }
        });
    });
});
