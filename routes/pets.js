
const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet')
const auth = require('../middleware/auth')


//------------ GET REQUESTS ------------
// router.get('/', async (req, res) => {
//     const Pet = await Pet.find()
//     res.send(pets);
// });

router.get('/', petController.getAllPets);

router.get('/:id', petController.getPetsById);

// -------------- POST REQUESTS --------------
router.post('/', petController.postPets)

// ---------- PUT REQUEST ------------
router.put('/:id', petController.putPetsById)

// ------------- DELETE REQUEST --------------

router.delete('/:id', auth, petController.deletePetsById);

module.exports = router;