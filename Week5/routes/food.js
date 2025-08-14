const express = require('express');
const router = express.Router();

const Controllers = require('../controller/foodController');

router.get('/', Controllers.getAllFood);

module.exports = router;