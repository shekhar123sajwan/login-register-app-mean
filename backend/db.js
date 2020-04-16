const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const app = express();
const DB = process.env.ALTS_URI;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(
        () => {
            app.emit('connected', null);
            console.log('DB Connected');
        },
        (err) => {
            console.log(`Error: ${err.message}`);
        }
    );

module.exports = app;
