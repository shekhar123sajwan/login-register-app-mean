const express = require('express');
const DB = require('../backend/db');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const routers = require('./routers');
const path = require('path');
const logger = require('morgan');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin', routers);
app.use('/api', require('./routers/web'));

app.use((req, res, next) => {
    const err = new Error('Url not Found');
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: error.status || 500,
        error: true,
        message: error.message,
        data: [],
    });
});

DB.on('connected', function () {
    app.listen(port, () => {
        console.log(`listening PORT ${port}`);
    });
});
