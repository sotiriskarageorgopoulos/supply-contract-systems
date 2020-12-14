const jsr = require('jsrsasign');
const jsru = require('jsrsasign-util');
require('dotenv').config()
const certificate = jsru.readFile(process.env.DIR + "/certificate.pem", "utf-8");
const privateKey = jsru.readFileUTF8(process.env.DIR + '/key.pem');


const createDigitalSignature = (nameOfHospital) => {
    let sig = new jsr.KJUR.crypto.Signature({ "alg": "SHA1withRSA" });
    sig.init(privateKey);
    sig.updateString(nameOfHospital);
    signatureInfo = {
        sign: sig.sign(),
        validationDateTime: new Date().toISOString()
    }
    return signatureInfo;
}

const validateDigitalSignature = (nameOfHospital, signature) => {
    let sig = new jsr.KJUR.crypto.Signature({ "alg": "SHA1withRSA" });
    sig.init(certificate);
    sig.updateString(nameOfHospital);
    return sig.verify(signature);
}

module.exports = { createDigitalSignature, validateDigitalSignature }