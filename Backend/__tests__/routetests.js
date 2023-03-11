const testRoutes = require('../routes/testroutes');

const supertest = require('supertest');
const express = require('express');
const app = express();
const request = supertest(app);

app.use('test/', recipeRoute);

describe('Router tests', () => {
	it('tests router GET all function', () => {
		request.get('recipes/')
	})
})

test('index route works', done => {
	request(app)
	.get('/')
	.expect("Content-Type", /json/)
	.expect(200, done);
	
	request(app)
	.get('/1')
	.expect("Content-Type", /json/)
	.expect(200, done);

	request(app)
	.post('/')
	.expect("Content-Type", /json/)
	.expect(200, done);

	request(app)
	.patch('/1')
	.expect("Content-Type", /json/)
	.expect(200, done);

	request(app)
	.delete('/1')
	.expect("Content-Type", /json/)
	.expect(200, done);
})

test('test route works', done => {
	request(app)
	.get('/test/')
	.expect("Content-Type", /json/)
	.expect(200, done);
	
	request(app)
	.get('/test/1')
	.expect("Content-Type", /json/)
	.expect(200, done);

	request(app)
	.post('/test/')
	.expect("Content-Type", /json/)
	.expect(200, done);

	request(app)
	.patch('/test/1')
	.expect("Content-Type", /json/)
	.expect(200, done);

	request(app)
	.delete('/test/1')
	.expect("Content-Type", /json/)
	.expect(200, done);
})