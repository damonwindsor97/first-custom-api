const mongoose = require('mongoose');
const Joi = require('joi')

const petSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    dob: { type: Date, required: true },
    digsHoles: { type: Boolean }
})
const Pet = mongoose.model('Pet', petSchema)

// -------------- Validate function ---------------
function validatePet(pet){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        owner: Joi.string().min(3).required(),
        dob: Joi.date().required(),
        digsHoles: Joi.boolean()

    })
    return schema.validate(pet)
}

module.exports.petSchema = petSchema;
module.exports.Pet = Pet;
module.exports.validatePet = validatePet;