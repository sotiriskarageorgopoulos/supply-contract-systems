const mongoose = require('mongoose');
const legalEntitySchema = require('./schemas/legalEntity');

const hospitalSchema = new mongoose.Schema({
    hospital: legalEntitySchema
});

const hospital = mongoose.model('hospital', hospitalSchema);
module.exports = hospital;