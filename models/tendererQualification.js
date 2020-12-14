const mongoose = require('mongoose');
const digitalSignatureSchema = require('./schemas/digitalSignature');
const evidenceSchema = require('./schemas/evidence');
const legalEntitySchema = require('./schemas/legalEntity');
const qualificationSchema = require('./schemas/qualification');

const tendererQualificationSchema = new mongoose.Schema({
    supplier: legalEntitySchema,
    qualifications: [qualificationSchema],
    evidences: [evidenceSchema],
    digitalSignature: digitalSignatureSchema
});

const tendererQualification = mongoose.model('tendererQualification', tendererQualificationSchema);
module.exports = tendererQualification;