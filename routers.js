const router = require('express').Router();

router.post("/login", (req, res) => {

})

router.post("/register", (req, res) => {

})

router.post("/publish_tender_announcement", (req, res) => {

})

router.post("/send_tender", (req, res) => {

})

router.post("/send_tender_response", (req, res) => {

})

router.get("/tender_announcement", (req, res) => {

})

router.get("/tender", (req, res) => {

})

router.get("/tender_response", (req, res) => {
    res.send("Hello!")
})

module.exports = router;