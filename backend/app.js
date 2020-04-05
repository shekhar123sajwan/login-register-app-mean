const express = require('express');
const DB = require('../backend/db');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const users = require('../backend/routers/users');
const path = require('path')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000; 

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', users); 

app.get('/', (req, res) => {
   res.status(404);
   res.send('Invalid');
});

DB.on('connected', function() {
	app.listen(port, () => {
		console.log(`listening PORT ${port}`); 
	});
});    