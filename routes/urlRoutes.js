const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/api/url', urlController.createShortUrl);
router.get('/api/url/:shortId', urlController.redirectUrl);

module.exports = router;
