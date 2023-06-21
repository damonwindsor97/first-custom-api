const {Pet, validatePet } = require('../models/pet')

module.exports = {
    // GET REQUESTS
    async getAllPets (req, res) {
        const pet = await Pet.find()
        if (!pet) return res.status(404).send('The Pet with the given ID was not found');
        res.send(pet);
    },

    async getPetsById (req, res) {
        const pet = await Pet.findById(req.params.id)
        if (!pet) return res.status(404).send('The Pet with the given ID was not found');
        res.send(pet);
    },

    // POST REQUEST
    async postPets (req, res) {
        const { error } = validatePet(req.body)
        if (error) return res.status(400).send(error)
    
        try {
            let pet = new Pet(req.body);
            pet = await pet.save();
            res.send(pet)
        } catch (error) {
            console.log(error)
        }    
    },

    // PUT REQUEST
    async putPetsById (req, res) {
        const { error } = validatePet(req.body)
        // Does the pet exist within the DB already?
       if (error) return res.status(400).send(error.details[0].message);
    
       try {
        let pet = await Pet.findByIdAndUpdate(req.params.id, { name: req.body.name, owner: req.body.owner })
        if(!pet) return res.status(404).send('The pet with the given ID was not found')
        res.send(pet)

       } catch (error) {
            console.log(error)
       }
    
    },

    // DELETE REQUEST
    async deletePetsById (req, res) {
        try{
            const pet = await Pet.findByIdAndRemove(req.params.id)
            if(!pet) return res.status(404).send('The pet with the given ID was not found');
            res.send(pet);
        }
        catch(error){
            console.log(error)
        }
    }


}


