const { MongoClient } = require('mongodb');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

// Get URI directly from process.env after dotenv is loaded
let client;
let db;

async function connectDB() {
  try {
    // Read URI fresh each time
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log('URI starts with:', uri.substring(0, 50) + '...');
    
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    
    await client.connect();
    db = client.db('campus-ride');
    console.log('✅ MongoDB Connected');
    return db;
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    return null;
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectDB first.');
  }
  return db;
}

module.exports = { connectDB, getDB };