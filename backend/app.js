const express = require('express');
const DB = require('../backend/db');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const routers = require('./routers');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routers);

app.use((req, res, next) => {
    const err = new Error('Url not Found');
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});

DB.on('connected', function () {
    app.listen(port, () => {
        console.log(`listening PORT ${port}`);
    });
});
