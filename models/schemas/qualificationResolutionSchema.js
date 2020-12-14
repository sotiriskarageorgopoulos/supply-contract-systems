const mongoose = require('mongoose');

const qualificationResolutionSchema = new mongoose.Schema({
    exlcusionReasonDesc: {
        type: String,
        required: false
    },
    decision: {
        type: Boolean,
        required: true
    },
    decisionDate: {
        type: Date,
        required: true
    }
});

module.exports = qualificationResolutionSchema;