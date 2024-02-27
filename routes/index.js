var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bored Programmer API' });
});

router.post('/', function(req, res, next) {
  res.send("This shouldn't do anyting, how did you get here?")
});

module.exports = router;
