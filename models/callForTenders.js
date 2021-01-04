const mongoose = require('mongoose');
const personSchema = require('./schemas/person');
const legalEntitySchema = require('./schemas/legalEntity');
const digitalSignatureSchema = require('./schemas/digitalSignature');
const tenderDurationSchema = require('./schemas/tenderDuration');

const callForTendersSchema = new mongoose.Schema({
    person: personSchema,
    hospital: legalEntitySchema,
    tenderRequirements: [{ required: true, type: String }],
    digitalSignature: digitalSignatureSchema,
    tenderDuration: tenderDurationSchema
});

callForTenders = mongoose.model('callForTenders', callForTendersSchema);
module.exports = callForTenders;