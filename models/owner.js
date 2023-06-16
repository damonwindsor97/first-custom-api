const mongoose = require('mongoose')
const Joi = require('joi')

const { petSchema } = require('./pet')
//Pet schema - This allows us to embed the petSchema in the ownerSchema

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, trim: true, maxlength: 255,
    },
    hobbies: {
        type: String,
        required: true, trim: true, maxlength: 1024,
    },
    petId: {
        type: petSchema,
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now,
    }
})


const Owner = mongoose.model('Owner', ownerSchema);

function validateOwner(owner) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        hobbies: Joi.string().max(1024).required(),
        petId: Joi.required()
    })

    return schema.validate(owner)
}

exports.Owner = Owner;
exports.validateOwner = validateOwner;