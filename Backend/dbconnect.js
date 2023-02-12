const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
let mongo;

const connectDB = async () => {
    let dbConnectionString = process.env.DB_CONNECTION_STRING;
    
    if(process.env.NODE_ENV === 'test') {
        const mongo = await MongoMemoryServer.create();
        dbConnectionString = mongo.getUri();
    }

    try{
        await mongoose.connect(dbConnectionString);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

const disconnectDB = async () => {
    try {
      await mongoose.connection.close();
      if (mongo) {
        await mongo.stop();
      }
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };

module.exports = {connectDB, disconnectDB}