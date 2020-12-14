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
        const clerk = clerkModel
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
        const supplier = supplierModel
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
    if (req.body != null) {
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
    if (req.body != null) {
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

})

router.post("/send_tender_response", (req, res) => {

})

router.get("/tender_announcements", (req, res) => {

})

router.get("/tender_announcement/:id", (req, res) => {

})

router.get("/tenders", (req, res) => {

})

router.get("/tender/:id", (req, res) => {

})

router.get("/tender_responses", (req, res) => {
    res.send("Hello!")
})


module.exports = router;