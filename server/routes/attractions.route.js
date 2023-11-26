const express = require('express');
const router = express.Router();
const { UpdateAttraction } = require('../controllers/attractions.controller')

router.post('/updateAttraction', UpdateAttraction);

module.exports = router;