const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/register', async (req, res) => {
    res.json(req.files);
});

router.post('/login', async (req, res) => {
    res.json('sf');
});

router.get('/:id', async (req, res) => {
    res.json('hi');
});

module.exports = router;
