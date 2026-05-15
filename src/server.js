require('dotenv').config({ quiet: true });

const { connectDB, disconnectDB } = require('./config/db');
const app = require('./app');

const DEFAULT_PORT = 3000;
const MIN_PORT = 1;
const MAX_PORT = 65535;
let server;
let isShuttingDown = false;

const isBlank = (value) => value === undefined || String(value).trim() === '';

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

const startServer = async () => {
  try {
    const PORT = getPort();

    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
      } else {
        console.error('Server error:', error.message);
      }
      process.exit(1);
    });

    server.setTimeout(30000);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const shutdown = (signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`${signal} received. Closing server...`);

  if (!server || !server.listening) {
    process.exit(0);
    return;
  }
  const shutdownTimeout = setTimeout(() => {
    console.error('Shutdown timed out. Forcing exit.');
    process.exit(1);
  }, 10000);

  server.close(async (error) => {
    clearTimeout(shutdownTimeout);

    if (error) {
      console.error('Error while closing server:', error.message);
      process.exit(1);
    }

    try {
      await disconnectDB();
      console.log('Server closed successfully.');
      process.exit(0);
    } catch (disconnectError) {
      console.error('Error while disconnecting database:', disconnectError);
      process.exit(1);
    }
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  shutdown('UNHANDLED_REJECTION');
});

startServer();

