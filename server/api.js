const express = require('express');
const router = express.Router();

const api = require('./queries');

router.post('/citation', api.getCitation);
router.post('/rss', api.getRSS);
router.post('/uploadSurvey', api.uploadSurvey);

module.exports = router;
