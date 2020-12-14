const express = require('express')
const bodyParser = require('body-parser')
const router = require('./components/routers');
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_STRING, {
        useUnifiedTopology: true
    },
    (err, client) => {
        if (err) return console.error(err);
    });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)
app.listen(process.env.PORT, () => console.log(`Server is listening in port ${process.env.PORT}.`))