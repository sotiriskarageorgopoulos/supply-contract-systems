const mongoose = require('mongoose');
const digitalSignatureSchema = require('./schemas/digitalSignature');
const evidenceSchema = require('./schemas/evidence');
const legalEntitySchema = require('./schemas/legalEntity');
const qualificationSchema = require('./schemas/qualification');

const tendererQualificationSchema = new mongoose.Schema({
    supplier: { required: true, type: legalEntitySchema },
    hospital: { required: true, type: legalEntitySchema },
    qualifications: [{ required: true, type: qualificationSchema }],
    evidences: [{ required: true, type: evidenceSchema }],
    digitalSignature: { required: true, type: digitalSignatureSchema }
});

const tendererQualification = mongoose.model('tendererQualification', tendererQualificationSchema);
module.exports = tendererQualification;