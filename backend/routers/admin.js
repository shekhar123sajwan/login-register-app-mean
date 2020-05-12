const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.post('/register', async (req, res, next) => {
    res.json(req.files);
});

router.post('/auth', adminController.login);

router.get('/:id', async (req, res, next) => {
    res.json('hi');
});

module.exports = router;
