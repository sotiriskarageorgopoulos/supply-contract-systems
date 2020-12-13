const mongoose = require('mongoose');
const personSchema = require('./schemas/person');

const userClerkSchema = mongoose.Schema({
    person: personSchema,
    hospitalLabel: {
        type: String,
        required: true
    }
})

const userClerk = mongoose.model('userClerk', userClerkSchema);
module.exports = userClerk;