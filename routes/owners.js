const express = require('express');
const router = express.Router();
const ownersController = require('../controllers/owners')

router.post('/', ownersController.postOwners);

router.get('/', ownersController.getAllOwners);

router.get('/id', ownersController.getOwnersById);

router.post('/', ownersController.postOwners);

router.put('/id', ownersController.putOwnerById);

router.delete('/id', ownersController.deleteOwnerById);

module.exports = router;