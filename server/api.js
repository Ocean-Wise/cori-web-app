const express = require('express');
const router = express.Router();

const api = require('./queries');

router.post('/rss', api.getRSS);
router.post('/submitSurvey', api.submitSurvey);

module.exports = router;
