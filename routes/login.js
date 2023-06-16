
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login')
const auth = require('../middleware/auth')

router.post('/', loginController.login);

module.exports = router;