const express = require('express');
const multer = require('multer');
const router = express.Router();
const InvoiceController = require('../controllers/invoice');

router.get('/', InvoiceController.findAll);
router.get('/search', InvoiceController.search);
router.get('/:id', InvoiceController.findOne);
router.post('/', InvoiceController.create);
router.delete('/:id', InvoiceController.delete);
router.put('/:id', InvoiceController.update);

module.exports = router;
