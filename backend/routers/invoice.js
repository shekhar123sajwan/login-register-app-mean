const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/invoice');
const authService = require('../service/auth');
//var jwt = require('express-jwt');

// router.use(jwt({ secret: process.env.SECRET }));

router.use([authService.handleAuthorization]);
router.get('/', InvoiceController.findAll);
router.get('/search', InvoiceController.search);
router.get('/:id', InvoiceController.findOne);
router.post('/', InvoiceController.create);
router.delete('/:id', InvoiceController.delete);
router.put('/:id', InvoiceController.update);

module.exports = router;
