var express = require('express');
var router = express.Router();

const api_controller = require('../controllers/apiController.js');

/* Return a random Activity */
router.get('/', api_controller.api_random);

/* Return a queried Activity */
/// router.get('', api_controller.api_query);

module.exports = router;
