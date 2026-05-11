require('dotenv').config({ quiet: true });

const { connectDB, disconnectDB } = require('./config/db');
const app = require('./app');

const DEFAULT_PORT = 3000;
const MIN_PORT = 1;
const MAX_PORT = 65535;

const isBlank = (value) => value === undefined  || String(value).trim() === '';

const getPort = (value = process.env.PORT) => {
  if (isBlank(value)) {
    return DEFAULT_PORT;
  }

  const normalizedPort = String(value).trim();

  if (!/^\d+$/.test(normalizedPort)) {
    throw new Error(`PORT must be a number between ${MIN_PORT} and ${MAX_PORT}.`);
  }

  const port = Number(normalizedPort);

  if (!Number.isSafeInteger(port) || port < MIN_PORT || port > MAX_PORT) {
    throw new Error(`PORT must be a number between ${MIN_PORT} and ${MAX_PORT}.`);
  }

  return port;
};

const PORT = getPort();

const startServer = async () => {
  try {
    await connectDB();

   const server= app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    server.setTimeout(3500);
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};



startServer();

module.exports = {
  connectDB,
  disconnectDB};
