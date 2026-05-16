const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error.middleware');
const router = require('./routes/index');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

module.exports = app;
