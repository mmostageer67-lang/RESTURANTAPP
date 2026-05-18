const express = require('express');
const { registerController } = require('./auth.controller');
const { validate } = require('../../middlewares/validation.middleware');
const { registerSchema } = require('./auth.validation');

const router = express.Router();
router.post('/register', validate(registerSchema), registerController);

module.exports = router;
