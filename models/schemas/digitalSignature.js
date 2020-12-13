const mongoose = require('mongoose');

const digitalSignatureSchema = new mongoose.Schema({
    signatureId: {
        type: String,
        required: true
    },
    validationDateTime: {
        type: Date,
        required: true
    },
    signatureHash: {
        type: String,
        required: true
    }
});

module.exports = digitalSignatureSchema;