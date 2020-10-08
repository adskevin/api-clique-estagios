const express = require('express');
const router = express.Router();
const { autentica } = require('../controller/auth_controller');

router.post('/', autentica);

module.exports = router;