const express = require('express');
const router = express.Router();

const userController = require('../controllers/users')

router.post('/', userController.postUser)

router.get('/:id', userController.getUserByTokenId)



module.exports = router;