const mongoose = require('mongoose');
const legalEntitySchema = require('./schemas/legalEntity');
const qualificationResolutionSchema = require('./schemas/qualificationResolutionSchema');
const personSchema = require('./schemas/person');
const digitalSignatureSchema = require('./schemas/digitalSignature');

const tendererQualificationResponseSchema = new mongoose.Schema({
    hospital: legalEntitySchema,
    supplier: legalEntitySchema,
    qualificationResolution: qualificationResolutionSchema,
    person: personSchema,
    digitalSignature: digitalSignatureSchema
});

const tendererQualificationResponse = new mongoose.model('tendererQualificationResponse', tendererQualificationResponseSchema);
module.exports = tendererQualificationResponse;