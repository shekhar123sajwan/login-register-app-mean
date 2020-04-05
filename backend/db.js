const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const app = express();
const DB = process.env.ALTS_URI;

mongoose.connect(DB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(
() => {   
 app.emit('connected', null);
 console.log('DB Connected'); 
},
 err => { console.log(err); }
);

module.exports = app;

  