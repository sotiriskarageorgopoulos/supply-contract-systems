const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
    evidenceId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = evidenceSchema;