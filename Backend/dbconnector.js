require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    let dbConnectionString = "";
    if(process.env.NODE_ENV === "test") {
        const mockDB = await MongoMemoryServer.create();
        dbConnectionString = mockDB.getUri();
    }
    else {
        dbConnectionString = process.env.MONGO_URI;
    }

    try {
        const conn = await mongoose.connect(dbConnectionString, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
    } catch(err) {
        console.log(err);
    }
}

module.exports = {connectDB}