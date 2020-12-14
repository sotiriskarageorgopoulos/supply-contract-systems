const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    personId: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true
    },
    personSurname: {
        type: String,
        required: true
    },
    personOtherName: {
        type: String,
        required: false
    },
    personJobTitle: {
        type: String,
        required: true
    }
});

module.exports = personSchema;