const app = require('express');
const router = app.Router();

router.use('/user', require('./user'));
router.use('/invoices', require('./invoice'));

module.exports = router;
