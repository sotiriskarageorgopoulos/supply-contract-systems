const mongoose = require('mongoose');
const legalEntitySchema = require('./schemas/legalEntity');

const userSupplierSchema = mongoose.Schema({
    supplier: legalEntitySchema
});

const userSupplier = mongoose.model('userSupplier', userSupplierSchema);
module.exports = userSupplier;