const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/invoice');
var jwt = require('express-jwt');

router.use(jwt({ secret: process.env.SECRET }));
router.get('/', InvoiceController.findAll);
router.get('/search', InvoiceController.search);
router.get('/:id', InvoiceController.findOne);
router.post('/', InvoiceController.create);
router.delete('/:id', InvoiceController.delete);
router.put('/:id', InvoiceController.update);

module.exports = router;
