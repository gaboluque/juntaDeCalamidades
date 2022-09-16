const { MongoClient } = require('mongodb');


const dbName = "jdc_" + process.env.NODE_ENV;
const uri = process.env.MONGO_URI + dbName;
const client = new MongoClient(uri);

async function connectDB() {
  await client.connect();
  console.log("Connected correctly to server");
  const db = client.db(dbName);
  return db;
}

module.exports = {
  connectDB
}