const { Owner, validateOwner } = require('../models/owner')
const { Pet } = require('../models/pet')


module.exports = {

    async postOwners(req, res) {
        try {
            const { error } = validateOwner(req.body)
            if (error) return res.status(400).send(error.details[0].message)

            const pet = await Pet.findById(req.body.petId)
            if (!pet) return res.status(404).send("Invalid Pet ID")

            const owner = new Owner({
                name: req.body.name,
                hobbies: req.body.hobbies,
                petId: {
                    _id: pet._id,
                    name: pet.name,
                    owner: pet.owner,
                    dob: pet.dob,
                    digsHoles: pet.digsHoles
                }

            })
            const result = await owner.save()
            res.send(result)
        } catch (error) {
            console.log(error);
        }
    },



    async getAllOwners (req, res) {
        const owner = await Owner.find()
        if (!owner) return res.status(400).send("No owners found");
        res.send(owner)
    },

    async getOwnersById (req, res) {
        const owner = await Owner.findById(req.params.id)
        if (!owner) return res.status(404).send("The owner with the given ID was not found")
    },

    async deleteOwnerById (req, res) {
        try {
            const owner = await Owner.findByIdAndRemove(req.params.id)
            if(!owner) return res.status(400).send('The owner with the given ID was not found');
            res.send(owner);
        }
        catch(error){
            console.log(error)
        }
    },

    async putOwnerById (req, res) {
        const { error } = validateOwner(req.body) 
        if (error) return res.status(400).send(error.details[0].message);

        try {
            let owner = await Owner.findByIdAndUpdate(req.params.id, { name: req.body.name })
            if (!owner) return res.status(404).send('The owner with the given ID was not found');
            res.send(owner);
        }
        catch (error){
            console.log(error)
        }

        owner.name = req.body.name
        res.send(owner)
    }






}