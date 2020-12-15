const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const callForTendersModel = require('../models/callForTenders');
const tendererQualificationModel = require('../models/tendererQualification');
const tendererQualificationResponseModel = require('../models/tendererQualificationResponse');
const clerkModel = require('../models/userClerk');
const supplierModel = require('../models/userSupplier');
const crypt = require('./cryptography');
const digSign = require('./digitalSignature');

router.post("/login/clerk", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email !== null && password !== null) {
        clerkModel
            .findOne({ "email": email })
            .then(c => {
                let decryptedPass = crypt.createDecryptedPassword(c.password, crypt.cryptoKey);
                if (password === decryptedPass) res.json(c);
                else res.json({ authorized: false });
            })
            .catch(err => res.status(500).send(err));
    } else {
        res.json({ authorized: false });
    }
});

router.post("/login/supplier", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email !== null && password !== null) {
        supplierModel
            .findOne({ "supplier.email": email })
            .then(s => {
                let decryptedPass = crypt.createDecryptedPassword(s.password, crypt.cryptoKey);
                if (password === decryptedPass) res.json(s);
                else res.json({ authorized: false });
            })
            .catch(err => res.status(500).send(err));
    } else {
        res.json({ authorized: false });
    }
});

router.post("/register/clerk", (req, res) => {
    if (req.body !== null) {
        req.body.password = createEncryptedPassword(req.body.password, cryptoKey);
        const clerk = new clerkModel(req.body);
        clerk.save()
            .then(c => res.json(c))
            .catch(err => res.status(500).send(err));
    } else {
        res.json({ body: null });
    }
});

router.post("/register/supplier", (req, res) => {
    if (req.body !== null) {
        req.body.password = createEncryptedPassword(req.body.password, cryptoKey);
        const supplier = supplierModel(req.body);
        supplier.save()
            .then(s => res.json(s))
            .catch(err => res.status(500).send(err));
    } else {
        res.json({ body: null });
    }
});

router.post("/publish_tender_announcement", (req, res) => {
    if (req.body !== null) {
        const hospitalName = req.body.hospital.label;
        const digitalSignatureId = uuidv4();
        const { sign, validationDateTime } = digSign.createDigitalSignature(hospitalName);

        req.body.digitalSignature.signatureId = digitalSignatureId;
        req.body.digitalSignature.validationDateTime = validationDateTime;
        req.body.digitalSignature.signatureHash = sign;

        const callForTender = new callForTendersModel(req.body);
        callForTender.save()
            .then(cft => res.json(cft))
            .catch(err => res.status(500).send(err));
    } else {
        res.send({ body: null })
    }
});

router.post("/send_tender", (req, res) => {
    if (req.body !== null) {
        const supplierName = req.body.supplier.label;
        const digitalSignatureId = uuidv4();
        const { sign, validationDateTime } = digSign.createDigitalSignature(supplierName);

        req.body.digitalSignature.signatureId = digitalSignatureId;
        req.body.digitalSignature.validationDateTime = validationDateTime;
        req.body.digitalSignature.signatureHash = sign;

        const tendererQualification = new tendererQualificationModel(req.body);
        tendererQualification.save()
            .then(tq => res.json(tq))
            .catch(err => res.status(500).send(err));

    } else {
        res.json({ body: null });
    }
});

router.post("/send_tender_response", (req, res) => {
    if (req.body !== null) {
        const hospitalName = req.body.hospital.label;
        const digitalSignatureId = uuidv4();
        const { sign, validationDateTime } = digSign.createDigitalSignature(hospitalName);

        req.body.digitalSignature.signatureId = digitalSignatureId;
        req.body.digitalSignature.validationDateTime = validationDateTime;
        req.body.digitalSignature.signatureHash = sign;

        const tendererQualificationResponse = new tendererQualificationResponseModel(req.body);
        tendererQualificationResponse.save()
            .then(tqr => res.json(tqr))
            .catch(err => res.status(500).send(err));
    } else {
        res.json({ body: null });
    }
});

router.get("/tender_announcements", (req, res) => {
    callForTendersModel
        .find({})
        .then(cft => res.json(cft))
        .catch(err => res.status(500).send(err));
});

router.get("/tender_announcement/:id", (req, res) => {
    let id = req.params.id; //id of document 
    callForTendersModel
        .findById(id)
        .then(cft => res.json(cft))
        .catch(err => res.status(500).send(err));
});

router.get("/tenders", (req, res) => {
    tendererQualificationModel
        .find({})
        .then(tq => res.json(tq))
        .catch(err => res.status(500).send(err))
});

router.get("/tender/:id", (req, res) => {
    let id = req.params.id; //id of document
    tendererQualificationModel
        .findById(id)
        .then(tq => res.json(tq))
        .catch(err => res.status(500).send(err));
});

router.get("/tender_responses", (req, res) => {
    tendererQualificationResponseModel
        .find({})
        .then(tqr => res.json(tqr))
        .catch(err => res.status(500).send(err));
});

router.get("/tender_response/:id", (req, res) => {
    let id = req.params.id; //id of document
    tendererQualificationResponseModel
        .findById(id)
        .then(tqr => res.json(tqr))
        .catch(err => res.status(500).send(err));
});

module.exports = router;