const mongoose = require('mongoose');
const legalEntitySchema = require('./schemas/legalEntity');

const supplierSchema = mongoose.Schema({
    supplier: legalEntitySchema,
    password: {
        type: String,
        required: true
    }
});

const supplier = mongoose.model('supplier', supplierSchema);
module.exports = supplier;