const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI must be defined in environment variables.');
  }
  
  return mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
}

async function disconnectDB() {
  return mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
