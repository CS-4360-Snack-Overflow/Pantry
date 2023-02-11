const index = require('../routes/index');
const testroute = require('../routes/testroutes');

const request = require('supertest');
const express = require('express');
const app = express();

app.use('/', index);
app.use('/test/', testroute)

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