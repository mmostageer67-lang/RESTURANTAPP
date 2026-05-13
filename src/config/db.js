const mongoose = require('mongoose');

const MONGO_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
};

const getMongoURI = () => {
  const uri = process.env.MONGO_URI;

  if (!uri || typeof uri !== 'string' || uri.trim() === '') {
    throw new Error('MONGO_URI environment variable is required.');
  }

  const trimmed = uri.trim();

  if (!trimmed.startsWith('mongodb://') && !trimmed.startsWith('mongodb+srv://')) {
    throw new Error('MONGO_URI must be a valid MongoDB connection string.');
  }

  return trimmed;
};

let connection = null;

const connectDB = async () => {
  if (connection) {
    return connection;
  }

  const uri = getMongoURI();

  connection = await mongoose.connect(uri, MONGO_OPTIONS);

  return connection;
};

const disconnectDB = async () => {
  if (!connection) {
    return;
  }

  await mongoose.disconnect();
  connection = null;
};

module.exports = { connectDB, disconnectDB };
