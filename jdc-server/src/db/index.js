const { MongoClient } = require('mongodb');


const dbName = "jdc_" + process.env.NODE_ENV;
const uri = "mongodb+srv://gaboluque:JLFq1lZvPJM8UYZ7@cluster0.dxeiklm.mongodb.net/" + dbName;
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