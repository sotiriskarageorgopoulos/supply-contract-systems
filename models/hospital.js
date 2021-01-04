const mongoose = require('mongoose');
const legalEntitySchema = require('./schemas/legalEntity');

const hospitalSchema = new mongoose.Schema({
    hospital: { required: true, type: legalEntitySchema }
});

const hospital = mongoose.model('hospital', hospitalSchema);
module.exports = hospital;