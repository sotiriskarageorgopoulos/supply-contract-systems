const mongoose = require('mongoose');

const tenderDurationSchema = mongoose.Schema({
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    }
});

module.exports = tenderDurationSchema;