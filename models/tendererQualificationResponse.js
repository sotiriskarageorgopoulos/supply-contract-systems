const mongoose = require('mongoose');
const legalEntitySchema = require('./schemas/legalEntity');
const qualificationResolutionSchema = require('./schemas/qualificationResolutionSchema');
const personSchema = require('./schemas/person');
const digitalSignatureSchema = require('./schemas/digitalSignature');

const tendererQualificationResponseSchema = new mongoose.Schema({
    hospital: { required: true, type: legalEntitySchema },
    supplier: { required: true, type: legalEntitySchema },
    qualificationResolution: { required: true, type: qualificationResolutionSchema },
    person: { required: true, type: personSchema },
    digitalSignature: { required: true, type: digitalSignatureSchema }
});

const tendererQualificationResponse = new mongoose.model('tendererQualificationResponse', tendererQualificationResponseSchema);
module.exports = tendererQualificationResponse;