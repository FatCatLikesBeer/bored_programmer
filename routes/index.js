var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: "Bored Programmer API"});
});

router.post('/', (req, res, next) => {
  res.send("POST: Undefined request");
});

module.exports = router;
