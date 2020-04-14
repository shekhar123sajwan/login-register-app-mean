const express = require('express');
const multer = require('multer');
const router = express.Router();
const forms = multer();
const InvoiceController = require('../controllers/invoice');

router.get('/', InvoiceController.findAll);
router.post('/', InvoiceController.create);

module.exports = router;
