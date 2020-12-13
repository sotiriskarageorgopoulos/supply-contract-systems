const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
    tendererCapability: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    evidenceId: {
        type: String,
        required: true
    }
});

module.exports = qualificationSchema;