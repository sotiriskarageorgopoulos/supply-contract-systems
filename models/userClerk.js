const mongoose = require('mongoose');
const personSchema = require('./schemas/person');

const clerkSchema = mongoose.Schema({
    person: personSchema,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hospitalLabel: {
        type: String,
        required: true
    }
})

const clerk = mongoose.model('clerk', clerkSchema);
module.exports = clerk;