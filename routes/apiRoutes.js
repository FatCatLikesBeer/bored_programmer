var express = require('express');
var router = express.Router();

const api_controller = require('../controllers/apiController.js');

/* Return a random Activity */
router.get('/', api_controller.api_random);

module.exports = router;
