const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost/mymoney';
console.log('db.js ...')
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
  } catch (err) {
    console.error(err);
    throw err;
  }
}

connect();


module.exports = client;