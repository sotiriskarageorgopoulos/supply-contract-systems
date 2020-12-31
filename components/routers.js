const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const callForTendersModel = require('../models/callForTenders');
const tendererQualificationModel = require('../models/tendererQualification');
const tendererQualificationResponseModel = require('../models/tendererQualificationResponse');
const clerkModel = require('../models/userClerk');
const supplierModel = require('../models/userSupplier');
const hospitalModel = require('../models/hospital');
const crypt = require('./cryptography');
const digSign = require('./digitalSignature');

router.post("/api/login/clerk", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (email !== null && password !== null) {
        clerkModel
            .findOne({ "email": email })
            .then(c => {
                dbPass = c.get('password');
                if (dbPass !== '') {
                    let decryptedPass = crypt.createDecryptedPassword(dbPass, crypt.cryptoKey);
                    if (password === decryptedPass) res.json({ authorized: true });
                    else res.json({ authorized: false });
                } else res.json({ authorized: false });
            })
            .catch(err => res.status(500).send(err));
    } else {
        res.json({ authorized: false });
    }
});

router.post("/api/login/supplier", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email !== null && password !== null) {
        supplierModel
            .findOne({ "supplier.email": email })
            .then(s => {
                dbPass = s.get('password');
                if (dbPass !== '') {
                    let decryptedPass = crypt.createDecryptedPassword(dbPass, crypt.cryptoKey);
                    if (password === decryptedPass) res.json({ authorized: true });
                    else res.json({ authorized: false });
                } else res.json({ authorized: false });
            })
            .catch(err => res.status(500).send(err));
    } else {
        res.json({ authorized: false });
    }
});

router.post("/api/register/clerk", (req, res) => {
    if (req.body !== null) {
        req.body.password = crypt.createEncryptedPassword(req.body.password, crypt.cryptoKey);
        const clerk = new clerkModel(req.body);
        clerk.save()
            .then(c => res.json(c))
            .catch(err => res.status(500).send(err));
    } else {
        res.json({ registered: false });
    }
});

router.post("/api/register/supplier", (req, res) => {
    if (req.body !== null) {
        req.body.password = crypt.createEncryptedPassword(req.body.password, crypt.cryptoKey);
        const supplier = supplierModel(req.body);
        supplier.save()
            .then(s => res.json(s))
            .catch(err => res.status(500).send(err));
    } else {
        res.json({ registered: false });
    }
});

router.post("/api/publish_tender_announcement", (req, res) => {
    if (req.body !== null) {
        const hospitalName = req.body.hospital.label;
        const digitalSignatureId = uuidv4();
        const { sign, validationDateTime } = digSign.createDigitalSignature(hospitalName);

        req.body.digitalSignature.signatureId = digitalSignatureId;
        req.body.digitalSignature.validationDateTime = validationDateTime;
        req.body.digitalSignature.signatureHash = sign;

        const callForTender = new callForTendersModel(req.body);
        callForTender.save()
            .then(cft => res.status(200).send({ published: true }))
            .catch(err => res.status(500).send(err));
    } else {
        res.send({ published: false })
    }
});

router.post("/api/send_tender", (req, res) => {
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
        res.json({ sended: false });
    }
});

router.post("/api/send_tender_response", (req, res) => {
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
        res.json({ sended: false });
    }
});

router.get("/api/tender_announcement/:id", (req, res) => {
    let id = req.params.id;
    callForTendersModel
        .findOne({ "hospital.id": id })
        .then(cft => {
            let hospitalName = cft.hospital.label;
            let digitalSign = cft.digitalSignature.signatureHash;
            if (digSign.validateDigitalSignature(hospitalName, digitalSign)) return res.json(cft);
            else return res.json({ "validation": false });
        })
        .catch(err => res.status(500).send(err));
});

router.get("/api/tender_announcements", (req, res) => {
    callForTendersModel
        .find({})
        .then(cft => res.json(cft))
        .catch(err => res.status(500).send(err));
});

router.get("/api/tenders/:label", (req, res) => {
    let label = req.params.label;
    tendererQualificationModel
        .find({ "hospital.label": label })
        .then(tq => res.json(tq))
        .catch(err => res.status(500).send(err));
});

router.get("/api/tender/:id", (req, res) => {
    let id = req.params.id;
    tendererQualificationModel
        .findOne({ "supplier.id": id })
        .then(tq => {
            let supplierName = tq.supplier.label;
            let digitalSign = tq.digitalSignature.signatureHash;
            if (digSign.validateDigitalSignature(supplierName, digitalSign)) return res.json(tq);
            else return res.json({ "validation": false });
        })
        .catch(err => res.status(500).send(err));
});

router.get("/api/tender_response/:id", (req, res) => {
    let id = req.params.id;
    tendererQualificationResponseModel
        .findOne({ "supplier.id": id })
        .then(tqr => res.json(tqr))
        .catch(err => res.status(500).send(err));
});

router.get("/api/tender_responses/:id", (req, res) => {
    let id = req.params.id;
    tendererQualificationResponseModel
        .find({ "supplier.id": id })
        .then(tqr => res.json(tqr))
        .catch(err => res.status(500).send(err));
});

router.get("/api/hospitals", (req, res) => {
    hospitalModel
        .find()
        .then(h => res.json(h))
        .catch(err => res.status(500).send(err));
});

router.get("/api/hospital/:id", (req, res) => {
    let id = req.params.id;
    hospitalModel
        .findOne({ "hospital.id": id })
        .then(h => res.json(h))
        .catch(err => res.status(500).send(err));
})

router.get("/api/clerk/:email", (req, res) => {
    let email = req.params.email;
    clerkModel
        .findOne({ "email": email })
        .then(c => res.json(c))
        .catch(err => res.status(500).send(err));
});

router.get('/api/supplier/:email', (req, res) => {
    let email = req.params.email;
    supplierModel
        .findOne({ "supplier.email": email })
        .then(s => res.json(s))
        .catch(err => res.status(500).send(err));
});
module.exports = router;