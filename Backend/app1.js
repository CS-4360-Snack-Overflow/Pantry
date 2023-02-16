import { MongoClient } from 'mongodb';

import express from 'express';
const app = express();

const uri = "mongodb://127.0.0.1:27017/";
let mongoClient;

mongoClient = new MongoClient(uri);
console.log('Connecting to MongoDB Atlas cluster...');
await mongoClient.connect();
console.log('Successfully connected to MongoDB Atlas!');

const db = mongoClient.db('dgiri12db');
const collection = db.collection('food');

console.log('CREATE Data');

const studentDocument = {
name: 'Biriyani',
ingredients: "tomato, onion, rice",
};

await collection.insertOne(studentDocument);

await mongoClient.close();

