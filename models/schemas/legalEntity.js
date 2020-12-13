const mongoose = require('mongoose');

const LegalEntitySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = LegalEntitySchema;