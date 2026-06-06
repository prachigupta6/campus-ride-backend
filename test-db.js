require('dotenv').config();
const { MongoClient } = require('mongodb');

async function testConnection() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    await client.close();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();