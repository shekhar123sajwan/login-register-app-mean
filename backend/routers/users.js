const express = require('express');
const multer = require('multer');
const router = express.Router();
const forms = multer();

// router.use((req, res, next) => {
// 	console.log(req);
//     next();
// });

router.get('/', (req, res) => {
	res.status(200);
	res.json({'message': 'ok'})
});

router.post('/register', forms.array('image'), (req, res) => {
  
  res.json(req.files)
  
});

router.post('/login', (req, res) => { 

  
});

router.get('/:id', (req, res) => {

  res.json('hi')
});
 
module.exports = router;